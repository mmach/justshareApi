"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import { UserTypeRolesDTO } from "justshare-shared";


/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class RevokeUserTypeRoleCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture }}
   * @memberof CreateUserCommand
   */
  /**
    * Creates an instance of CreateUserCommand.
    * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture }}
    * @memberof CreateUserCommand
    */
  constructor({
    logFileInfrastructureDI,
    userTypesRolesServiceDI,
    authInfrastructureDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI
    });
    this.userTypesRolesServiceDI = userTypesRolesServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserTypeRolesDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    await this.userTypesRolesServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });
  }
}


