import BaseProcess from "../Architecture/Base/baseProcess.js";
import { AuthInfrastucture,ClosingInfrastructure,DbTransactionInfrastucture,LogFileInfrastructure } from "../Architecture/index.js";
import BlobService from "../Services/Blobs/implementations/blobService.js";
import CategoryService from "../Services/Categories/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";
import { updateItemChain, createItem } from "./commonFunctions/index.js";


("use strict");
export default class Item_CreateItemProcess extends BaseProcess {
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
    authInfrastructureDI,
    //   dbTransactionInfrastuctureDI,
    itemServiceDI,
    validationInfrastructureDI,
    categoryServiceDI,
    blobServiceDI,
    elasticSearchServiceDI,
    tagServiceDI,
    closingInfrastructureDI,
    projectInfrastructureDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      //  dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      closingInfrastructureDI,
      projectInfrastructureDI
    });
    this.itemServiceDI = itemServiceDI;
    this.blobServiceDI = blobServiceDI;
    this.categoryServiceDI = categoryServiceDI;
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.tagServiceDI = tagServiceDI;
    this.clobs = {}
  }

  get validation() {
    let funcList = [];
    return funcList;
  }

  init(dto) {
    this.model = { ...dto };
  }




  async action() {
    try {

      let item = await createItem.bind(this)(this.model)
      //  console.log(item);
      await updateItemChain.bind(this)(this.model, this.process_chain.process_id, this.process_chain.id)
    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
//  let prom = diff.map(i => {

//  })
//  throw 'dupa'











