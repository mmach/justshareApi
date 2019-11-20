import BaseCommand from "../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import ItemService from "../../Services/itemService.js";
import ItemDTO from "./../../Shared/DTO/Item/ItemDTO.js";
import BlobService from "../../Services/blobService.js";
import CategoryService from "../../Services/categoryService.js";
import BlobValidators from "../../Validators/blobValidators.js";
import Promise from "bluebird";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import TagService from './../../Services/tagService.js'
import uuidv4 from "uuid/v4";
import ClosingInfrastructure from "../../Architecture/Infrastructure/closingInfrastructure.js";
import amqp from 'amqplib/callback_api';

("use strict");

export default class setItemSyncCommand extends BaseCommand {
  /**
   * Creates an instance of CreateItemCommand.
   * @param   {{ logFileInfrastructureDI:LogFileInfrastructure ,
   * authInfrastructureDI:AuthInfrastucture,
   * dbTransactionInfrastuctureDI:DbTransactionInfrastucture,
   * itemServiceDI:ItemService,
   * blobServiceDI:BlobService,
   * categoryServiceDI:CategoryService,
   * elasticSearchServiceDI:ElasticSearchService,
   * tagServiceDI:TagService,
   * closingInfrastructureDI:ClosingInfrastructure}}
   * @memberof CreateItemCommand
   */
  constructor({
    logFileInfrastructureDI,
    dbTransactionInfrastuctureDI,
    itemServiceDI,
    validationInfrastructureDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
   //   authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
    });
    this.itemServiceDI = itemServiceDI;
      }

  get validation() {
    let funcList = [];
    /* this.model.blobs.forEach(item => {
       let blob = Object.assign(new BlobBase64DTO(), item);
       funcList.push(() => {
         return BlobValidators.checkUploadedFileType.bind(this)(blob);
       });
       funcList.push(() => {
         return BlobValidators.getSizeOfUplodedFile.bind(this)(blob);
       });
     });*/
    return funcList;
  }
  init(dto) {
    this.model = Object.assign(new ItemDTO(), dto);
    this.model.is_elastic_sync = false;

  }




  async action() {
    // console.log(this.model);
    await this.itemServiceDI.setContext(this.context).setAsSyncElastic({ id: this.model.id });
    return;
    // this.closingInfrastructureDI.addClosingFunction(
    //  this.elasticClosingFunc.bind(this)
    // )
    /*
        this.closingInfrastructureDI.addClosingFunction(
          this.elasticClosingFunc.bind(this)
        )*/
    //await this.insertCategories(item.id);

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}
