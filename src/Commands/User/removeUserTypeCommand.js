"use strict";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import { UserTypeDTO } from "justshare-shared";


/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class RemoveUserTypeCommand extends BaseCommand {
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
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
       authInfrastructureDI,
      projectInfrastructureDI
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
   
    await this.userTypesServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });
  }
}
