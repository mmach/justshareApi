"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

import { MailPartsDTO } from "justshare-shared";
import { BaseQuery } from "../../Architecture/Base/baseQuery.js";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";


/**
 *
 *
 * @export
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class GetMailPartQuery extends BaseQuery {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    
    projectInfrastructureDI,
    mailPartsServiceDI
  }) {
    super({
      logFileInfrastructureDI,
      
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
    return await this.mailPartsServiceDI.setContext(this.context).getAll({ model: this.model, withProject: false })
  }

}