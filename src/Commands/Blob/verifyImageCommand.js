"use strict";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import BlobService from "../../Services/blob/implementations/blobService.js";
import {ValidatonInfrastructure} from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {BlobDTO} from "justshare-shared";



/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class VerifyImageCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture,blobServiceDI:BlobService,validationInfrastructureDI:ValidatonInfrastructure }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    blobServiceDI,
    projectInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI
    });
    this.blobServiceDI = blobServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new BlobDTO(), dto);
  }
/*
  get validation() {
    return [
      ()=>{return BlobValidators.checkUploadedFileType.bind(this)(this.model)},
      ()=>{return BlobValidators.getSizeOfUplodedFile.bind(this)(this.model)},
      ()=>{return BlobValidators.countOfUsersImages.bind(this)()}];
  }*/


  async action() {
    let result = await this.blobServiceDI.setContext(this.context).verifyImage({
      blob: this.model,
    });
  }
}
