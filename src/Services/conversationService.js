import BaseService from "../Architecture/baseService.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";
import { uuid } from "../../node_modules/uuidv4/build/lib/uuidv4.js";
import * as useSockets from "../WebsocketMessages/index.js";



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
  async getUserConversations({ conv_id, page, size, status }) {
    return await this.unitOfWorkDI.conversationRepository.getUserConversations({
      page, size, conv_id, status
    })
  }
  async getUserConversation({ conv_id, last_msg, size }) {
    let message_list_id = await this.unitOfWorkDI.conversationRepository.getUserConversation({
      conv_id, last_msg, size
    })
    return await this.unitOfWorkDI.conversationRepository.getMessages({ conv_id, message_list_id })
  }

  async getUserConversationInfo({ conversation_id }) {
    return await this.unitOfWorkDI.conversationRepository.getUserConversationInfo({
      conversation_id
    })
  }
  async createConversation({ id, title, user_owner, message, iua_id, user_dest, status }) {
    let conversation = {
      id: id,
      user_owner_id: user_owner.id,
      iua_id: iua_id,
      status: status,
      title: title,
      createdAt: new Date(),
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
      createdAt: new Date()


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

    let hash = Buffer.from(proj.socket).toString('base64').replace(/=/g, '');
    let obj = {
      id: msg_id,
      project_id: this.context.project.id,
      user_id: this.context.user.id,
      iua_id: iua_id,
      conversation_id: conversation.id,
      conversation_title: conversation.title,
      conversation_status: conversation.status,
      number_of_unreaded: 1,
      message: message,
      message_triggered_id: conversation.messages[0].id,
      created_at: new Date(),
      project_hash: '/socket_' + hash,
      conv_members_count: conversation.users.length,
      users: conversation.users.map(i => { return { ...i.user_details } }),
    }
    useSockets.chatUserInvite({ project_socket: obj.project_hash, user_id: user_owner.id, conversation_id: obj.conversation_id, conversation: obj })
    useSockets.chatUserInvite({ project_socket: obj.project_hash, user_id: user_dest[0].id, conversation_id: obj.conversation_id, conversation: obj })


  }

  async sendMessageToUser({ iua_id, msg_id, msg, syncSocket }) {
    let conv = await this.toJsonParse(this.unitOfWorkDI.conversationRepository.getUserConversations({
      iua_id
    }))
    let proj = await this.projectServiceDI.getProjectsSockets({})
    proj = proj.filter(item => { return item.id == this.context.project.id })[0]

    conv = conv[0]
    let users = {}
    conv.messages.forEach(i => {
      users[i.user_id] = users[i.user_id] ? 0 : users[i.user_id]++
    })
    let user_id = Object.keys(users).filter(i => i != this.context.user.id).sort((a, b) => {
      users[a] > users[b] ? 1 : -1
    })[0]
    let user = conv.users.find(i => i.user_id == user_id)
    console.log(user)
    let hash = Buffer.from(proj.socket).toString('base64').replace(/=/g, '');
    // console.log(conv.messages[0].id);
    let obj = {
      id: msg_id,
      project_id: this.context.project.id,
      user_id: this.context.user.id,
      conversation_id: conv.id,
      iua_id: conv.iua_id,
      //  conv_id: conv.id,
      conversation_title: conv.title,
      conversation_status: conv.status,
      number_of_unreaded: 1,
      message: msg,
      //is_newest: true,
      message_triggered_id: conv.messages[0].id,
      created_at: new Date(),
      project_hash: '/socket_' + hash,
      //participant_user_id: user.user_id,
      //participant_name: user.name,
      //participant_blob_id: user.blob_profile ? user.blob_profile.blob_min_id : '',
      conv_members_count: conv.users.length,
      users: conv.users,
    }
    global.queueChannel.publish(CONFIG.CHAT_QUEUE, this.context.project.id,
      obj, {
      contentType: 'application/json', persistent: true, expiration: 20 * 1000, messageId: msg_id, headers: {
        Authorization: 'Bearer ' + this.context.token,
        ProjectAuthorization: 'Bearer ' + this.context.projectToken
      }
    })
    conv.users.forEach(u => {
      useSockets.chatUserInvite({ project_socket: obj.project_hash, user_id: u.id, conversation_id: obj.conversation_id, conversation: obj })
    })
  }
  async iuaSetProcessChainId({ iua_id, process_chain_id }) {

    let proj = await this.projectServiceDI.getProjectsSockets({})
    proj = proj.filter(item => { return item.id == this.context.project.id })[0]

    let hash = Buffer.from(proj.socket).toString('base64').replace(/=/g, '');
    // console.log(conv.messages[0].id);
    let obj = {
      iua_id: iua_id,
      process_chain_id: process_chain_id,
      project_hash: '/socket_' + hash,
    }
    console.log('wtf whyyy')
    console.log('NEW IUA ')
    console.log(obj)
    useSockets.syncIuaProcessChain({ project_socket: obj.project_hash, iua_id: obj.iua_id, iua_process_obj: obj })

  }

  async closeConversation({ id, iua_id }) {
    return await this.unitOfWorkDI.conversationRepository.closeConversation({ id, iua_id })

  }

  async setStatusConversation({ id, iua_id, status }) {
    return await this.unitOfWorkDI.conversationRepository.setStatusConversation({ id, iua_id, status })

  }
  /*
  await this.conversationMessagesServiceDI.setContext(this.context).insert({
    model: conversation.messages[0]
    , withProject: true
  })*/
  /*
  conversation.messages[0].users = [{
    id: uuid(),
    user_id: user_dest[0].id,
    conversation_id: id,
    message_id: msg_id,
    status: 'N'
  }]*/
}





