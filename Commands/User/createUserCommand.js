"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";

import { UserRegisterInternalDTO } from "justshare-shared";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import ValidatonInfrastructure from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import MailSender from "../../Architecture/mailSender.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";
import EMAIL_TEMPLATE from "../../Static/MailsXSLT/index.js"
import UserValidators from './../../Validators/userValidators.js';
import { URL } from "url";

/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class CreateUserCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,validationInfrastructureDI:ValidatonInfrastructure, dbTransactionInfrastuctureDI:DbTransactionInfrastucture,mailSenderDI:MailSender }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    validationInfrastructureDI,
    dbTransactionInfrastuctureDI,
    mailSenderDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      validationInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserRegisterInternalDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) },
      async () => { await UserValidators.checkIfMailExistInDb.bind(this)() }]
  }

  async action() {
    let result = await this.userServiceDI.setContext(this.context).newInternalUser({
      model: this.model
    });

    let model = {
      body: {
        name: result.name,
        email: result.email,
        uid: result.uid,
        href: this.referer ? (new URL(this.referer)).origin : 'http://localhost.8080'//this.referer,//CONFIG.FRONT_END_URL,
      }
    };

    await this.mailSenderDI.mailSend({
      xslt_file: EMAIL_TEMPLATE.authorization,
      model,
      email_to: model.body.email,
      language: result.language,
      mail_title: new CodeDictionary().get_trans("AUTHORIZATION_TITLE", "EMAIL", result.language)

    });
  }
}


