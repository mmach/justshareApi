"use strict";
import { UserDTO } from "justshare-shared";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import { MailSender } from "../../Architecture/mailSender.js";
import CONFIG from "../../config.js";
import UserService from "../../Services/userService.js";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class AuthorizeUserCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,mailSenderDI:MailSender}}
   * @memberof CreateUserCommand
   */
  constructor({ logFileInfrastructureDI, userServiceDI, mailSenderDI, projectInfrastructureDI }) {
    super({
      logFileInfrastructureDI,
      projectInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserDTO(), dto);
  }


  async action() {
    let result = await this.userServiceDI.setContext(this.context).authorizeUser({
      guid: this.model.uid
    });
    if (result != null) {
      let model = {
        name: result.name,
        email: result.email,
        uid: result.uid,
        href: CONFIG.FRONT_END_URL

      };
      await this.mailSenderDI.setContext(this.context).mailSend({
        type: 'NEW_USER_MAIL',
        model: model,
        email_to: model.email,
        language: result.language
      });

    }
  }
}
