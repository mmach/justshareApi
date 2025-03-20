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
export default class IUA_Cron_ReminderDaysIUACounterProcess extends BaseProcess {
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
    itemServiceDI,
    itemUserActionServiceDI
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
    this.itemUserActionServiceDI = itemUserActionServiceDI
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
      let item = await this.itemUserActionServiceDI.setContext(this.context).getItemUserActions({ iua_id: this.model.iua_id })
      item = item[0]
      if (new Date().setHours(0, 0, 0, 0) < (new Date(item.updatedAt).addDays(this.process_chain.in_days).setHours(0, 0, 0, 0))) {
        return true
      }
      if (new Date().setHours(0, 0, 0, 0) >= (new Date(item.updatedAt).addDays(this.process_chain.in_days).setHours(0, 0, 0, 0))) {
        return false
      }

      return null
    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
    //  let prom = diff.map(i => {

    //  })
    //  throw 'dupa'













