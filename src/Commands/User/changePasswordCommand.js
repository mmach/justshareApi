"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import { UserLoginInternalDTO } from "justshare-shared";
import ServerException from "../../Architecture/Exceptions/serverException.js";

/**
 *
 *
 * @export
 * @class ChangePasswordCommand
 * @extends {BaseCommand}
 */
export default class ChangePasswordCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,authInfrastructureDI:AuthInfrastucture }}
   * @memberof ChangePasswordCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    mailSenderDI,
    authInfrastructureDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserLoginInternalDTO(), dto);
  }

  get validation() {
    return [
      () => { this.checkDTO.bind(this)(this.model) }];
  }

  async action() {
    let result = await this.userServiceDI
    .setContext(this.context).comparePassword({ 
      user: this.context.user
      , password: this.model.old_password
    })
    if(result ==false)
    {
      throw new ServerException().throw({
        code: "PASSWORD_INCORRECT",
        type: "ERROR"
      });
    }else{
      await this.userServiceDI
      .setContext(this.context)
      .changePassword({
        user: this.context.user,
        password: this.model.password
      });
    
    }
  }
     
}
