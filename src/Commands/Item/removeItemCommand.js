import { ItemDTO } from "justshare-shared";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";
import { AuthInfrastucture } from "../../Architecture/Infrastructure/authInfrastucture.js";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../Services/Blobs/blobService.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import ItemService from "../../Services/itemService.js";
("use strict");

export default class RemoveItemCommand extends BaseCommand {
  /**
   * Creates an instance of CreateItemCommand.
   * @param   {{ logFileInfrastructureDI:LogFileInfrastructure ,
   * authInfrastructureDI:AuthInfrastucture,
   * dbTransactionInfrastuctureDI:DbTransactionInfrastucture,
   * itemServiceDI:ItemService,
   * blobServiceDI:BlobService,
   * categoryServiceDI:CategoryService}}
   * @memberof CreateItemCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    dbTransactionInfrastuctureDI,
    itemServiceDI,
    validationInfrastructureDI,
    projectInfrastructureDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      projectInfrastructureDI
    });
    this.itemServiceDI = itemServiceDI;
  }

  get validation() {
    let funcList = [];
    //
    return [];
  }
  init(dto) {
    this.model = Object.assign(new ItemDTO(), dto);
  }



  async action() {

    await this.itemServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}
