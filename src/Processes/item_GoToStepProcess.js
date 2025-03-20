import BaseProcess from "../Architecture/Base/baseProcess.js";
import {AuthInfrastucture}from "../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/Blobs/blobService.js";
import CategoryService from "../Services/Categories/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";
import { getItem } from "./commonFunctions/getItem.js";
import { updateItemChain } from "./commonFunctions/updateItemChain.js";


("use strict");
export default class Item_GoToStepProcess extends BaseProcess {
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
    validationInfrastructureDI,
    elasticSearchServiceDI,
    closingInfrastructureDI,
    projectInfrastructureDI,
    mailSenderDI,
    itemServiceDI
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
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.itemServiceDI = itemServiceDI
    this.mailSenderDI = mailSenderDI

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
      let item = await getItem.bind(this)(this.model.id,this.process_chain.use_es)
      await updateItemChain.bind(this)(item, this.process_chain.process_id, this.process_chain.id)

    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
    //  let prom = diff.map(i => {

    //  })
    //  throw 'dupa'













