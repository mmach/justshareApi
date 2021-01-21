"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import {UserDTO} from "justshare-shared";

/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class EditUserCommand extends BaseCommand {
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

  get validation() {
    return [];
  }

  async action() {
    console.log(this.model)
    await this.userServiceDI
      .setContext(this.context)
      .upsert({model:{
        id:this.model.id,
        name:this.model.name,
        surname:this.model.surname,
        phone:this.model.phone,
        nickname:this.model.nickname,
        birthDate:this.model.birthDate
      }
      })
  }
}
