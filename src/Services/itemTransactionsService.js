import BaseService from "../Architecture/baseService.js";
import { SearchItemDTO } from 'justshare-shared';
import CONFIG from "../config.js";
import { uuid } from "../../node_modules/uuidv4/build/lib/uuidv4.js";


/**
 *
 * @export
 * @class ItemService
 * @extends BaseService
 */
export default class ItemTransactionService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, projectServiceDI, conversationServiceDI, itemUserActionServiceDI }) {
    super({ unitOfWorkDI, repository: "itemTransactionRepository" });
    this.projectServiceDI = projectServiceDI;
    this.conversationServiceDI = conversationServiceDI
    this.itemUserActionServiceDI = itemUserActionServiceDI

  }

  /**
   *
   *
   * @param {{ id: Number }}
   * @returns
   * @memberof CategoryService
   */
   async getIuaParent({ iua_id }) {
    let root_iua_ids = await this.unitOfWorkDI.itemTransactionRepository.getRootIuaIds({ iua_ids: [iua_id] })

    let allGroupedIUAIds = await this.unitOfWorkDI.itemTransactionRepository.getFromRootIuaAllIuaIds({ iua_ids: root_iua_ids.map(i => i.iua_id) })
    const iuaList = await this.itemUserActionServiceDI.setContext(this.context).getItemUserActions({ iua_id: allGroupedIUAIds.map(i => i.iua_id) })


    const currentIua = iuaList.find(iua => iua.id == iua_id);
    const parent = iuaList.find(iua => iua.id == currentIua.parent_iua_id);
    return parent;
  }

  async getAllChildrenIUA({ iua_id }) {
    let root_iua_ids = await this.unitOfWorkDI.itemTransactionRepository.getAllChildrenIUA({ iua_ids: [iua_id] })
    const iuaList = await this.itemUserActionServiceDI.setContext(this.context).getItemUserActions({ iua_id: root_iua_ids.map(i => i.iua_id) })
    return iuaList;
  }
  
  async getItemTransaction({ iua_id, status_id, conversation_id }) {
    if (conversation_id && conversation_id[0]) {
      let obj = await this.conversationServiceDI.setContext(this.context).getById({ id: conversation_id })
      iua_id = [obj.iua_id]
    }
    let root_iua_ids = await this.unitOfWorkDI.itemTransactionRepository.getRootIuaIds({ iua_ids: iua_id })
    let result = await this.unitOfWorkDI.itemTransactionRepository.getItemTransaction({ iua_id: root_iua_ids.map(i => i.iua_id), status_id });
    result = await this.toJsonParse(result)
    let allGroupedIUAIds = await this.unitOfWorkDI.itemTransactionRepository.getFromRootIuaAllIuaIds({ iua_ids: root_iua_ids.map(i => i.iua_id) })
    const iuaList = await this.itemUserActionServiceDI.setContext(this.context).getItemUserActions({ iua_id: allGroupedIUAIds.map(i => i.iua_id) })
    return result.map(itemTransaction => {
      itemTransaction.iua_context_list = allGroupedIUAIds.filter(i => i.root_iua_id == itemTransaction.iua_id).map(i => {
        const iua = iuaList.find(iua => iua.id == i.iua_id);
        return {
          ...iua,
          is_main_iua: i.iua_id == i.root_iua_id,
        }
      })
      return { ...itemTransaction }
    })

  }
  async setStatus({ iua_id, status_id }) {
    let conv = await this.toJsonParse(this.unitOfWorkDI.conversationRepository.getUserConversations({
      iua_id
    }));
    let proj = await this.projectServiceDI.getProjectsSockets({})
    proj = proj.filter(item => { return item.id == this.context.project.id })[0]

    conv = conv[0]
    let hash = Buffer.from(proj.socket).toString('base64').replace(/=/g, '');
    let obj = {
      project_id: this.context.project.id,
      user_id: this.context.user.id,
      status_id: status_id,
      iua_id: iua_id,
      createdAt: new Date(),
      socket_user_id: '/socket_' + hash,
      users: conv.users.map(i => { return { ...i, id: uuid() } }),
    }

    conv.users.forEach(i => {
      global.socket.of("/socket_" + hash).emit(i.user_id + '-iua_status',
        obj)
    })

  }
}
