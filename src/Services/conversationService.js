import BaseService from "../Architecture/baseService.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";
import { uuid } from "../../node_modules/uuidv4/build/lib/uuidv4.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class ConversationService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, conversationMessagesServiceDI, userConversationServiceDI, conversationMessageMembersServiceDI, projectServiceDI }) {
    super({ unitOfWorkDI, repository: 'conversationRepository' });
    this.conversationMessagesServiceDI = conversationMessagesServiceDI
    this.userConversationServiceDI = userConversationServiceDI
    this.conversationMessagesMemberServiceDI = conversationMessageMembersServiceDI
    this.projectServiceDI = projectServiceDI

  }
  async getUserConversations({ page, size }) {
    return await this.unitOfWorkDI.conversationRepository.getUserConversations({
      page, size
    })
  }
  async getUserConversation({ conv_id, last_msg, size }) {
    let message_list_id = await this.unitOfWorkDI.conversationRepository.getUserConversation({
      conv_id, last_msg, size
    })
    return await this.unitOfWorkDI.conversationRepository.getMessages({ conv_id, message_list_id })
  }
  async createConversation({ id, title, user_owner, message, iua_id, user_dest }) {
    let conversation = {
      id: id,
      user_owner_id: user_owner.id,
      iua_id: iua_id,
      status: 'O',
      title: title,
      created_at:new Date(),
      project_id: this.context.project.id
    }

    await this.unitOfWorkDI.conversationRepository.insert({
      model: conversation,
      withProject: true

    })

    conversation.users = [
      {
        id: uuidv4(),
        user_id: user_owner.id,
        conversation_id: id,
        project_id: this.context.project.id,
        user_detail: user_owner
      }
      ,
      {
        id: uuidv4(),
        user_id: user_dest[0].id,
        conversation_id: id,
        project_id: this.context.project.id,
        user_detail: user_dest[0]


      }
    ]
    await this.userConversationServiceDI.setContext(this.context).insert({
      model: conversation.users[0],
      withProject: true
    })
    await this.userConversationServiceDI.setContext(this.context).insert({
      model: conversation.users[1]
      , withProject: true
    })
    let msg_id = uuidv4()
    conversation.messages = [{
      id: msg_id,
      user_id: user_owner.id,
      conversation_id: id,
      message: message,
      is_newest: true,
      message_triggered_id: null,
      project_id: this.context.project.id,
      created_at:new Date()


    }]
    await this.conversationMessagesServiceDI.setContext(this.context).insert({
      model: conversation.messages[0]
      , withProject: true
    })
    conversation.messages[0].users = [{
      id: uuid(),
      user_id: user_dest[0].id,
      conversation_id: id,
      message_id: msg_id,
      status: 'N'
    }]
    await this.conversationMessagesMemberServiceDI.setContext(this.context).insert({
      model: conversation.messages[0].users[0]
      , withProject: true
    })
    let proj = await this.projectServiceDI.getProjectsSockets({})
    proj = proj.filter(item => { return item.id == this.context.project.id })[0]
    console.log(proj)

    let hash = Buffer.from(proj.socket).toString('base64').replace(/=/g, '');
    console.log(hash)
    global.socket.of("/socket_" + hash).emit(user_owner.id + '-invite',
      conversation)
    global.socket.of("/socket_" + hash).emit(user_dest[0].id + '-invite',
      conversation)
  }

}



