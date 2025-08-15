import BaseProcess from "../Architecture/Base/baseProcess.js";
import {AuthInfrastucture}from "../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/blob/implementations/blobService.js";
import CategoryService from "../Services/category/implementations/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/item/itemService.js";
import { updateItemChain } from "./commonFunctions/updateItemChain.js";


("use strict");
export default class Item_UpdateExpiredItemProcess extends BaseProcess {
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
      let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: item.category_id })
      let cat = categories.filter(c => { return c.id == item.category_id })[0]
      var today = new Date();
      var expDate = new Date();
      expDate.setDate(today.getDate() + (cat.expired_day != null ? Number(cat.expired_day) : 5000));
      item.expired_date = expDate
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













