"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import { BaseDTO } from "justshare-shared";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import MailSender from "../../Architecture/mailSender.js";
import CONFIG from "../../config.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";
import EMAIL_TEMPLATE from "../../Static/MailsXSLT/index.js"
import { URL } from "url";

/**
 * 
 * 
 * @export
 * @class RemoveUserCommand
 * @extends {BaseCommand}
 */
export default class RemoveUserCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture,mailSenderDI:MailSender }}
   * @memberof RemoveUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    authInfrastructureDI,
    mailSenderDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new BaseDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    const userInfo = await this.userServiceDI.toJsonParse(this.userServiceDI.setContext(this.context).checkMailInDb({
      email: this.context.user.email, withoutAuth: true
    }));
    if (userInfo && userInfo.user_projects != undefined && userInfo.user_projects.length > 1) {
      await this.userServiceDI.setContext(this.context).deleteUserPriv({ user_id: this.context.user.id });

    } else {
      await this.userServiceDI.setContext(this.context).deleteUserPriv({user_id: this.context.user.id });

      await this.userServiceDI.setContext(this.context).delete({ model: this.context.user });
    }
    console.log(this.context.user);
    // await this.userServiceDI.setContext(this.context).deleteUserPriv({ model: this.context.user });

    // await this.userServiceDI.setContext(this.context).delete({ model: this.context.user });

    let model = {
      body: {
        name: this.context.user.name,
        email: this.context.user.email,
        href: (new URL(this.referer)).origin//this.referer,//CONFIG.FRONT_END_URL,
      }
    };
    await this.mailSenderDI.setContext(this.context).mailSend({
      xslt_file: 'USER_REMOVED_MAIL_BODY',
      model,
      email_to: model.body.email,
      language: this.context.language,
      mail_title: 'USER_REMOVED_MAIL_TITLE'

    });
  }
}
