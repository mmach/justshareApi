"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import { AuthInfrastucture } from "../../Architecture/Infrastructure/authInfrastucture.js";
import BlobService from "../../Services/Blobs/implementations/blobService.js";
import { ValidatonInfrastructure } from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { BlobDTO } from "justshare-shared";
import { BaseQuery } from "../../Architecture/Base/baseQuery.js";

//BlobStorageFilterDTOF



/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class getProjectsStorageQuery extends BaseQuery {
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
    this.model = Object.assign(new BlobDTO(), dto);//BlobStorageFilterDTO
  }



  async action() {
    return await this.blobServiceDI.setContext(this.context).getProjectsStorage({
      model: this.model,
    });
  }
}
