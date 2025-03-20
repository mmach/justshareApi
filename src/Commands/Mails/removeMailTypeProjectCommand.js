"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

import { MailTypesProjectsDTO } from "justshare-shared";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";

/**
 *
 *
 * @export
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class RemoveMailTypeProjectCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    dbTransactionInfrastuctureDI,
    projectInfrastructureDI,
    mailTypesProjectServiceDI
    
  }) {
    super({
      logFileInfrastructureDI,
      projectInfrastructureDI,
      dbTransactionInfrastuctureDI,
      
    });
    this.mailTypesProjectServiceDI = mailTypesProjectServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new MailTypesProjectsDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) }
    ]
  }

  async action() {

   await this.mailTypesProjectServiceDI.setContext(this.context).delete({ model: this.model, withProject: true })
  }


}