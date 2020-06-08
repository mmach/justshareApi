"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import { UserRolesDTO } from "justshare-shared";


/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class RevokeUserRoleCommand extends BaseCommand {
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
    this.model = Object.assign(new UserRolesDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    await this.userRolesServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });
  }
}
