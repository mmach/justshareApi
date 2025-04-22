import BaseProcess from "../Architecture/Base/baseProcess.js";
import {AuthInfrastucture}from "../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/Blobs/implementations/blobService.js";
import CategoryService from "../Services/Categories/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";
import { updateItemChain } from "./commonFunctions/updateItemChain.js";


("use strict");
export default class Item_SetExpiredProcess extends BaseProcess {
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
    categoryServiceDI,
    validationInfrastructureDI,
    elasticSearchServiceDI,
    closingInfrastructureDI,
    projectInfrastructureDI,
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
    this.itemServiceDI = itemServiceDI
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.categoryServiceDI = categoryServiceDI;
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
      let item = await this.itemServiceDI.setContext(this.context).getById({ id: this.model.id, withProject: true })

      item.status = 'E'
      await this.itemServiceDI.update({ model: item, withProject: true })

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













