"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

import { MailSendersDTO } from "justshare-shared";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";

/**
 *
 *
 * @export
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class UpsertMailSenderCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    dbTransactionInfrastuctureDI,
    projectInfrastructureDI,
    mailSendersServiceDI,
    translationServiceDI
  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI
    });
    this.mailSendersServiceDI = mailSendersServiceDI;
    this.translationServiceDI = translationServiceDI
  }
  init(dto) {
    this.model = Object.assign(new MailSendersDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) }
    ]
  }

  async action() {
    await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
    this.model.translation_id = this.model.translation.id;
    await this.mailSendersServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true })
  }

}