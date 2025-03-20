"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

import { MailPartsDTO } from "justshare-shared";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";

/**
 *
 *
 * @export
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class RemoveMailPartCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    dbTransactionInfrastuctureDI,
    projectInfrastructureDI,
    mailPartsServiceDI
  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI
    });
    this.mailPartsServiceDI = mailPartsServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new MailPartsDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) }
    ]
  }

  async action() {
    await this.mailPartsServiceDI.setContext(this.context).delete({ model: this.model, withProject: true })
  }


}