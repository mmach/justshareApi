"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

import { MailTypesDTO } from "justshare-shared";
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
export default class GetMailTypesQuery extends BaseQuery {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    projectInfrastructureDI,
    mailTypesServiceDI
    
  }) {
    super({
      logFileInfrastructureDI,
      projectInfrastructureDI,
      
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
  }

  async action() {

   
    return await this.mailTypesServiceDI.setContext(this.context).getAll({ model: this.model, withProject: true })
  }
}