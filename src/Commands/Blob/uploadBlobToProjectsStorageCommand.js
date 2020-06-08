"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import BlobService from "../../Services/blobService.js";
import ValidatonInfrastructure from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { BlobDTO } from "justshare-shared";



/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class UploadBlobToProjectsStorageCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture,blobServiceDI:BlobService,validationInfrastructureDI:ValidatonInfrastructure }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    blobServiceDI,
    projectInfrastructureDI,
    dbTransactionInfrastuctureDI

  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      projectInfrastructureDI,
      dbTransactionInfrastuctureDI,

    });
    this.blobServiceDI = blobServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new BlobDTO(), dto);
  }



  async action() {
    let result = await this.blobServiceDI.setContext(this.context).uploadUserProject({
      blob: this.model,
    });
  }
}
