"use strict";
import { UserLoginInternalDTO } from "justshare-shared";
import { URL } from "url";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import { MailSender } from "../../Architecture/mailSender.js";
import UserService from "../../Services/userService.js";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

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
        email: this.model.email,
        uid: result.uid,
        href: (new URL(this.referer)).origin,//this.referer,//CONFIG.FRONT_END_URL,
        name: result.name

      };
      await this.mailSenderDI.setContext(this.context).mailSend({
        type: 'GENERATE_NEW_PASSWORD',
        model: model,
        email_to: model.email,
        language: result.language,
      });
    }
  }
}
