"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";

import { MailTypesDTO } from "justshare-shared";
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
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class RemoveMailTypeCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    dbTransactionInfrastuctureDI,

    mailTypesServiceDI
  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI,

    });
    this.mailTypesServiceDI = mailTypesServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new MailTypesDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) }
    ]
    //async () => { await UserValidators.checkIfMailExistInDb.bind(this)() }]
  }

  async action() {
    await this.mailTypesServiceDI.setContext(this.context).delete({ model: this.model, withProject: false })
  }

}