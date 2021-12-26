import BaseService from "../Architecture/baseService.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class ConversationMessageMembersService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'conversationMessagesMembersRepository' });
  }

  async getUnreadMsg({ }) {
    return await this.unitOfWorkDI.conversationMessagesMembersRepository.getUnreadMsg({})
  }
  async getConversations({ conv_id, iua_id, page = 0, size = 20, status = 'O' }) {
    return await this.unitOfWorkDI.conversationMessagesMembersRepository.getConversations({ conv_id, iua_id, page, size, status })
  }

}
