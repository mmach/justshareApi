// @ts-nocheck

import bcrypt from "bcryptjs";
import uuidv4 from "uuid/v4";
import BaseService from "../Architecture/baseService.js";
import { UserDTO, UserLoginInternalDTO, UserRegisterInternalDTO } from "justshare-shared";
import UnitOfWork from "../unitOfWork.js";
import ServerException from "../Architecture/Exceptions/serverException.js";
import UserRepository from "../Repository/userRepository.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import CONFIG from "../config.js";

/**
 *
 * @export
 * @class UserService
 * @extends BaseService
 */
export default class UserTypesRolesService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, userRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'userTypesRolesRepository' });
  }
}
