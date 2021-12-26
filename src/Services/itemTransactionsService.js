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
  constructor({ unitOfWorkDI, projectServiceDI, conversationServiceDI }) {
    super({ unitOfWorkDI, repository: "itemTransactionRepository" });
    this.projectServiceDI = projectServiceDI;
    this.conversationServiceDI = conversationServiceDI

  }

  /**
   *
   *
   * @param {{ id: Number }}
   * @returns
   * @memberof CategoryService
   */



  async getItemTransaction({ iua_id, status_id, conversation_id }) {

    if (conversation_id) {
      let obj = await this.conversationServiceDI.setContext(this.context).getById({ id: conversation_id })
      iua_id = [obj.iua_id]
    }
    let result = await this.toJsonParse(this.unitOfWorkDI.itemTransactionRepository.getItemTransaction({ iua_id, status_id }));
    return result.map(item => {
      let element = Object.assign({}, item)

      return element;
    })
  }
  async setStatus({ iua_id, status_id }) {
    let conv = await this.toJsonParse(this.unitOfWorkDI.conversationRepository.getUserConversations({
      iua_id
    }));
    //  console.log(conv)
    let proj = await this.projectServiceDI.getProjectsSockets({})
    proj = proj.filter(item => { return item.id == this.context.project.id })[0]

    conv = conv[0]
    // console.log(conv)
    let hash = Buffer.from(proj.socket).toString('base64').replace(/=/g, '');
    // console.log(conv.messages[0].id);
    console.log(conv)
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
