"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import { UserTypeDTO } from "justshare-shared";


/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class UpsertUserTypeCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    translationServiceDI,
    userTypesServiceDI,
    authInfrastructureDI,
    projectInfrastructureDI,
    dbTransactionInfrastuctureDI
  }) {
    super({
      logFileInfrastructureDI,
      // authInfrastructureDI,
      projectInfrastructureDI,
      dbTransactionInfrastuctureDI
    });
    this.userTypesServiceDI = userTypesServiceDI;
    this.translationServiceDI = translationServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserTypeDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    console.log(this.model)
    await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
    this.model.translation_id = this.model.translation.id;
    await this.userTypesServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });
  }
}
