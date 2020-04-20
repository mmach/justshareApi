"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import EMAIL_TEMPLATE from "./../../Static/MailsXSLT/index.js";
import CONFIG from "../../config.js";
import MailSender from "../../Architecture/mailSender.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";
import { UserLoginInternalDTO } from "justshare-shared";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { URL } from "url";

/**
 *
 *
 * @export
 * @class SendMailForgotPasswordCommand
 * @extends {BaseCommand}
 */
export default class SendMailForgotPasswordCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,mailSenderDI:MailSender}}
   * @memberof ForgotPasswordCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    mailSenderDI,
    dbTransactionInfrastuctureDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserLoginInternalDTO(), dto);
  }

  get validation() {
    return [];
  }
  ///////////////////CREATE SERVICE FOR SEND ONLY MAIL TO this Action BUT WITHOUT LOG OUT !
  async action() {
    let result = await this.userServiceDI.setContext(this.context).checkMailInDb({
      email: this.model.email
    });
    if (result != null) {
      let model = {
        body: {
          email: this.model.email,
          uid: result.uid,
          href: (new URL(this.referer)).origin,//this.referer,//CONFIG.FRONT_END_URL,
          name: result.name
        }
      };
      await this.mailSenderDI.setContext(this.context).mailSend({
        xslt_file:'GENERATE_NEW_PASSWORD_MAIL_BODY',
        model,
        email_to: this.model.email,
        language: result.language,
        mail_title: 'FORGOT_PASSWORD_MAIL_TITLE'
      });
    }
  }
}
