"use strict";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import {UserDTO} from "justshare-shared";


/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class SetProfileImageCommand extends BaseCommand {
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
    this.model = Object.assign(new UserDTO(), dto);
  }

 
  async action() {
    await this.userServiceDI.setContext(this.context).setProfileImage({user:this.model});
  }
}
