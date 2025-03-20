"use strict";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import { UserTypeRolesDTO } from "justshare-shared";


/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class GrantUserRoleCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userRolesServiceDI,
    authInfrastructureDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI
    });
    this.userRolesServiceDI = userRolesServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserTypeRolesDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    await this.userRolesServiceDI.setContext(this.context).insert({ model: this.model, withProject: true });
  }
}
