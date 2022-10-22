"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";

import { UserRegisterInternalDTO, UserRolesDTO } from "justshare-shared";
import { URL } from "url";
import {v4} from "uuid";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import ValidatonInfrastructure from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import MailSender from "../../Architecture/mailSender.js";
import UserService from "../../Services/userService.js";
import UserValidators from './../../Validators/userValidators.js';

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
    projectInfrastructureDI,
    userTypesServiceDI,
    userRolesServiceDI
  }) {
    super({
      logFileInfrastructureDI,
      validationInfrastructureDI,
      dbTransactionInfrastuctureDI,
      projectInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
    this.userTypesServiceDI = userTypesServiceDI;
    this.userRolesServiceDI = userRolesServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserRegisterInternalDTO(), dto);
  }

  get validation() {
    return [
      async () => { await this.checkDTO.bind(this)(this.model) },
      async () => { await UserValidators.checkIfMailExistInDb.bind(this)() }]


  }

  async action() {

    let result = {}
    let userType = await this.userTypesServiceDI.setContext(this.context).getUserType({ model: { id: this.model.usertype_id } })
    /*const userInfo = await this.userServiceDI.toJsonParse(this.userServiceDI.setContext(this.context).checkMailInDb({
      email: this.model.email, withoutAuth: true
    }));
    result = userInfo
    if (userInfo && userInfo.user_projects != undefined && userInfo.user_projects.length > 0) {
      let proj = await userInfo.user_projects.find(item => {
        return item.project_id == this.context.project.id;
      });

      result = await this.userServiceDI.setContext(this.context).newInternalUser({
        model: this.model
      });
      await this.userServiceDI.setContext(this.context).grantPrivByName({

        user_id: result.id,
        project_id: this.context.project.id,
        name: 'USER'

      })*/
    this.model.id = v4();
    result = await this.userServiceDI.setContext(this.context).newInternalUser({
      model: this.model
    });
    if (userType[0]) {
      let prom = userType[0].usertype_roles.map(item => {
        let priv = {
          ...new UserRolesDTO(),
          usertype_id: userType[0].id,
          role_id: item.role_id,
          user_id: this.model.id
        }
        return this.userRolesServiceDI.setContext(this.context).insert({ model: priv, withProject: true });

      })
      await Promise.all(prom)
    }


    let model = {

      name: result.name,
      email: result.email,
      uid: result.uid,
      href: this.referer ? (new URL(this.referer)).origin : 'http://localhost.8080'//this.referer,//CONFIG.FRONT_END_URL,

    };

    await this.mailSenderDI.setContext(this.context).mailSend({
      type: 'AUTHORIZATION_MAIL',
      model: model,
      email_to: model.email,
      language: result.language
    });
  }
}

