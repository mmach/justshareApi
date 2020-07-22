import BaseCommand from "../../Architecture/baseCommand.js";

import Promise from "bluebird";
import CONFIG from "../../config.js";
import uuidv4 from "uuid/v4";

export default class ReadMessageCommand extends BaseCommand {

  constructor({
    authInfrastructureDI,
    logFileInfrastructureDI,
    projectInfrastructureDI,


  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI,
    });
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

    global.queueChannel.publish(CONFIG.CHAT_READ_QUEUE, this.context.project.id,
      {
        user_id: this.context.user.id,
        conversation_id: this.model.conversation_id,
        project_id: this.context.project.id,
        socket_user_id: this.model.socket_user_id,


      }, {
      contentType: 'application/json', persistent: true, expiration: 20 * 1000, messageId: this.model.id, headers: {
        Authorization: 'Bearer ' + this.token,
        ProjectAuthorization: 'Bearer ' + this.projectToken
      }
    })


  }




}


