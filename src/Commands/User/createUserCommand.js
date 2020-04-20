"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";

import { UserRegisterInternalDTO } from "justshare-shared";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import ValidatonInfrastructure from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import MailSender from "../../Architecture/mailSender.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";
import EMAIL_TEMPLATE from "../../Static/MailsXSLT/index.js"
import UserValidators from './../../Validators/userValidators.js';
import { URL } from "url";

/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class CreateUserCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,validationInfrastructureDI:ValidatonInfrastructure, dbTransactionInfrastuctureDI:DbTransactionInfrastucture,mailSenderDI:MailSender }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    validationInfrastructureDI,
    dbTransactionInfrastuctureDI,
    mailSenderDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      validationInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserRegisterInternalDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) }
    ]
    //async () => { await UserValidators.checkIfMailExistInDb.bind(this)() }]
  }

  async action() {

    let result = {}
    const userInfo = await this.userServiceDI.toJsonParse(this.userServiceDI.setContext(this.context).checkMailInDb({
      email: this.model.email, withoutAuth: true
    }));
    result = userInfo
    if (userInfo && userInfo.user_projects != undefined && userInfo.user_projects.length > 0) {
      let proj = await userInfo.user_projects.find(item => {
        return item.project_id == this.context.project.id;
      });

      if (proj == undefined) {

        await this.userServiceDI.setContext(this.context).grantPrivByName({

          user_id: userInfo.id,
          project_id: this.context.project.id,
          name: 'USER'

        })
      } else {
        let exception = new ValidationException();
        exception.throw({ field: "email", code: "EMAIL_EXIST_IN_DB" }, [
          this.model.email
        ]);
      }

    } else {

      result = await this.userServiceDI.setContext(this.context).newInternalUser({
        model: this.model
      });
      await this.userServiceDI.setContext(this.context).grantPrivByName({

        user_id: result.id,
        project_id: this.context.project.id,
        name: 'USER'

      })
    }

    let model = {
      body: {
        name: result.name,
        email: result.email,
        uid: result.uid,
        href: this.referer ? (new URL(this.referer)).origin : 'http://localhost.8080'//this.referer,//CONFIG.FRONT_END_URL,
      }
    };
    await this.mailSenderDI.setContext(this.context).mailSend({
      xslt_file: 'AUTH_MAIL_BODY',
      model,
      email_to: model.body.email,
      language: result.language,
      mail_title: "AUTH_MAIL_TITLE"

    });
  }
}


