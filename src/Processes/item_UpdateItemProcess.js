import BaseProcess from "../Architecture/Base/baseProcess.js";
import {AuthInfrastucture}from "../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/Blobs/implementations/blobService.js";
import CategoryService from "../Services/Categories/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";
import { getItem } from "./commonFunctions/getItem.js";
import { updateItemChain } from "./commonFunctions/updateItemChain.js";
import minimatch from 'minimatch'

("use strict");
export default class Item_UpdateItemProcess extends BaseProcess {
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
    itemCategoryOptionsServiceDI,
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
    this.itemServiceDI = itemServiceDI,
      this.mailSenderDI = mailSenderDI
    this.itemCategoryOptionsServiceDI = itemCategoryOptionsServiceDI

  }

  get validation() {
    let funcList = [];
    return funcList;
  }

  init(dto) {
    this.model = dto;
  }




  async action() {
    try {
      this.model.itemPatch.forEach(patch => {
        if (minimatch(patch.path, '/itemCategoryOption/**',{matchBase: true})) {
         
          const itemCategoryOptionId = patch.path.split('/')[2]
          console.log(patch)
          console.log(itemCategoryOptionId)
          if (patch.op == 'add') {
            this.itemCategoryOptionsServiceDI.setContext(this.context).upsertCategoryOption({
              model: patch.value,
              id: itemCategoryOptionId
            })
          } else if (patch.op == 'remove') {
            console.log('WTFF')

          } else if (patch.op == 'replace') {
            const valueToReplace = patch.path.split('/')[3]
            this.itemCategoryOptionsServiceDI.setContext(this.context).upsertCategoryOption({
              model: {
                [valueToReplace]: patch.value
              },
              id: itemCategoryOptionId
            })
          }

        } else {
          console.log(patch)
        }
      })
    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
    //  let prom = diff.map(i => {

    //  })
    //  throw 'dupa'













