"use strict";
import { RolesDTO } from "justshare-shared";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";


/**
 *
 *
 * @export
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class CreateRoleCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    dbTransactionInfrastuctureDI,
    projectInfrastructureDI,
    authInfrastructureDI,
    roleServiceDI
  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI,
      authInfrastructureDI
    });
    this.roleServiceDI = roleServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new RolesDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) }
    ]
  }

  async action() {
    await this.roleServiceDI.setContext(this.context).insert({ model: this.model, withProject: true })
  }

}