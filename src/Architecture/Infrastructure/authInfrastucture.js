"use strict";

import jwt from 'jsonwebtoken';
import fs from "fs";
import UserRepository from "../../Repository/user/userRepository.js";
import { BaseInfrastracture } from '../Base/baseInfrastructure.js';
import { ServerException } from '../Exceptions/serverException.js';


export class AuthInfrastucture extends BaseInfrastracture {

  /**
   *Creates an instance of AuthInfrastucture.
   * @param {{userRepositoryDI:UserRepository }
   * @memberof AuthInfrastucture
   */
  constructor({ userRepositoryDI }) {
    super();
    this.userRepositoryDI = userRepositoryDI;
    this.anonymous = false;
  }
  allowAnonymous() {
    this.anonymous = true;
  }
  async loginAgainCheck(user) {
    let result = await this.userRepositoryDI.getByGuid({ uid })
  }

  getDecodedToken(pToken) {
    let token = ''
    if (pToken) {
      token = pToken.split(' ')[1];
    }
    else {
      throw 'AUTHORIZATION_ERROR'
    }
    let cert = fs.readFileSync('./cert.key');
    let decoded = jwt.verify(token, cert.toString('utf8'));
    return decoded
  }

  async executeLayer(action) {
    try {
      if (action.context.user.id) {
        return await action
      }
      let context = this.getDecodedToken(action.token);
      let user = await this.userRepositoryDI.setContext({ context: action.context }).getByGuid({ uid: context.uid, withProject: true })

      if (user == undefined || user.relogin_require == true) {
        throw 'AUTHORIZATION_ERROR'
      }
      action.context.user = user.dataValues;
      return await action;
    } catch (ex) {
      if (!this.anonymous) {
        throw (new ServerException()).throw({ code: "AUTHORIZATION_ERROR", type: "ERROR" });
      } else {
        return await action;
      }
    }
  }
}
