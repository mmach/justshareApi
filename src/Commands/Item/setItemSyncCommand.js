import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import ItemService from "../../Services/itemService.js";
import {ItemDTO} from "justshare-shared";
import BlobService from "../../Services/Blobs/implementations/blobService.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import TagService from './../../Services/tagService.js'
import {ClosingInfrastructure} from "../../Architecture/Infrastructure/closingInfrastructure.js";

("use strict");

export default class SetItemSyncCommand extends BaseCommand {
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
    validationInfrastructureDI,
    
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
