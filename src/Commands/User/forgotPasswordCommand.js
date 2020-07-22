"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import { UserDTO } from "justshare-shared";
import EMAIL_TEMPLATE from "./../../Static/MailsXSLT/index.js";
import CONFIG from "../../config.js";
import MailSender from "../../Architecture/mailSender.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";

/**
 *
 *
 * @export
 * @class ForgotPasswordCommand
 * @extends {BaseCommand}
 */
export default class ForgotPasswordCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,mailSenderDI:MailSender,dbTransactionInfrastuctureDI:DbTransactionInfrastucture}}
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
    this.model = Object.assign(new UserDTO(), dto);
  }

  get validation() {
    return [];
  }
  //////////////////ROLLBACK IF Mail will not send
  async action() {
    let result = await this.userServiceDI.setContext(this.context).forgotPassword({
      uid: this.model.uid
    });
    if (result != null) {
      let model = {
        email: result.email,
        password: result.password,
        href: CONFIG.FRONT_END_URL,
        name: result.name

      };
      await this.mailSenderDI.setContext(this.context).mailSend({
        type: 'NEW_PASSWORD',
        model: model,
        email_to: model.email,
        language: result.language
      });
    }
  }
}

