"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import {BlobBase64DTO} from "justshare-shared";
import BlobService from "../../Services/blobService.js";
import ValidationException from "../../Architecture/Exceptions/validationExceptions.js";
import ValidatonInfrastructure from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import BlobValidators from "../../Validators/blobValidators.js";



/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class UploadImageCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture,blobServiceDI:BlobService,validationInfrastructureDI:ValidatonInfrastructure }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    blobServiceDI,
    dbTransactionInfrastuctureDI,
    validationInfrastructureDI,
    userServiceDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      projectInfrastructureDI
    });
    this.blobServiceDI = blobServiceDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new BlobBase64DTO(), dto);
  }

  get validation() {
    return [
      () => { return BlobValidators.checkUploadedFileType.bind(this)(this.model) },
      () => { return BlobValidators.getSizeOfUplodedFile.bind(this)(this.model) },
      () => { return BlobValidators.countOfUsersImages.bind(this)() }];
  }


  async action() {

    let result = await this.blobServiceDI.setContext(this.context).uploadUserImage({
      blob: this.model,
    });

    if (this.context.user.blob_id == null) {
      console.log(result.dataValues.id);
      this.context.user.blob_id = result.dataValues.id;
      await this.userServiceDI.setContext(this.context).setProfileImage({ user: this.context.user })
    }
  }
}
