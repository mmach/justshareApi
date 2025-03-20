"use strict";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import { UserDTO } from "justshare-shared";




/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class GenRefreshTokenCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService}}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    projectInfrastructureDI

  }) {
    super({
      logFileInfrastructureDI,
      projectInfrastructureDI

    });
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserDTO(), dto);
  }

  get validation() {
    return [() => { this.checkDTO.bind(this)() }];
  }

  async action() {
    await this.userServiceDI.setContext(this.context).genRefreshToken({ guid: this.model.uid });
  }
}
