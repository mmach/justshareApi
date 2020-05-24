"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";

import { RolesProjectDTO } from "justshare-shared";
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
export default class GrantRoleToProjectCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    dbTransactionInfrastuctureDI,
    roleProjectServiceDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI
    });
    this.roleProjectServiceDI = roleProjectServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new RolesProjectDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) }
    ]
    //async () => { await UserValidators.checkIfMailExistInDb.bind(this)() }]
  }

  async action() {
    await this.roleProjectServiceDI.setContext(this.context).delete({ model: this.model, withProject: true })
  }

}