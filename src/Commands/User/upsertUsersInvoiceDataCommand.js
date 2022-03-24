"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import { UserDTO } from "justshare-shared";

/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class UpsertUsersInvoiceDataCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    authInfrastructureDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI
    });
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = { ...dto };
  }

  get validation() {
    return [];
  }

  async action() {
    const id = this.model.id
    if (this.context.user.user_invoice_data_id == null || this.context.user.user_invoice_data_id == id) {
      await this.userServiceDI
        .setContext(this.context)
        .upsertUserInvoice({
          model: {
            id: id,
            name: this.model.name,
            address: this.model.address,
            tax_number: this.model.tax_number,
            country: this.model.country,
            city: this.model.city,
            zip_code: this.model.zip_code,
            user_name: this.model.user_name,
            bank_account_nr: this.model.bank_account_nr
          }
        })
      await this.userServiceDI.setContext(this.context).update({
        model: {
          ...this.context.user,
          user_invoice_data_id: id
        }, withProject: true
      })
    }
  }
}
