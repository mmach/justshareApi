import BaseCommand from "../../Architecture/baseCommand.js";

import Promise from "bluebird";
import CONFIG from "../../config.js";
import uuidv4 from "uuid/v4";

export default class SendMessageCommand extends BaseCommand {

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
    this.projectServiceDI = projectServiceDI


  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }


  async action() {
    let project = await this.projectServiceDI.setContext(this.context).getProjectSocketChannel({ project_id: this.context.project.id })

    global.queueChannel.publish(CONFIG.CHAT_QUEUE, this.context.project.id,
      {
        id: this.model.id,
        project_id: this.context.project.id,
        user_id: this.context.user.id,
        conversation_id: this.model.conversation_id,
        message: this.model.message,
        is_newest: true,
        message_triggered_id: this.model.message_triggered_id,
        createdAt: this.model.createdAt,
        socket_user_id: this.model.socket_user_id,
        users: this.model.users,
        project_socket: project.socket


      }, {
      contentType: 'application/json', persistent: true, expiration: 20 * 1000, messageId: this.model.id, headers: {
        Authorization: 'Bearer ' + this.token,
        ProjectAuthorization: 'Bearer ' + this.projectToken
      }
    })


  }




}


