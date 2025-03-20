import {BaseCommand} from "../../Architecture/Base/baseCommand.js";

import CONFIG from "../../config.js";

export default class ReadMessageCommand extends BaseCommand {

  constructor({
    authInfrastructureDI,
    logFileInfrastructureDI,
    projectInfrastructureDI,
    projectServiceDI


  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI,

    });
    this.projectServiceDI = projectServiceDI;
    //this.conversationMessagesService = conversationMessagesService


  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }


  async action() {
    console.log(this.context.project);
    let project = await this.projectServiceDI.setContext(this.context).getProjectSocketChannel({ project_id: this.context.project.id })
    global.queueChannel.publish(CONFIG.CHAT_READ_QUEUE, this.context.project.id,
      {
        user_id: this.context.user.id,
        conversation_id: this.model.conversation_id,
        project_id: this.context.project.id,
        socket_user_id: this.model.socket_user_id,
        project_socket: project.socket


      }, {
      contentType: 'application/json', persistent: true, expiration: 20 * 1000, messageId: this.model.id, headers: {
        Authorization: 'Bearer ' + this.token,
        ProjectAuthorization: 'Bearer ' + this.projectToken
      }
    })


  }




}


