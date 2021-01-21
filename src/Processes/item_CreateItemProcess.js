import BaseCommand from "../Architecture/baseCommand.js";
import AuthInfrastucture from "../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/blobService.js";
import CategoryService from "../Services/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import { uuid } from "../../node_modules/uuidv4/build/lib/uuidv4.js";
import { LinkItem, GetValueByDim, DimensionsList, StatusesList } from 'justshare-shared'
import fs from 'fs';
import ItemService from "../Services/itemService.js";
import BaseProcess from "../Architecture/baseProcess.js";
import {createItem} from './commonFunctions/createItem.js'


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
      dbTransactionInfrastuctureDI,
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
        dbTransactionInfrastuctureDI,
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
      this.model = {...dto};
    }
  
    

  
    async action() {
      try {
  console.log(this.model)

  console.log('process Chain')
  console.log(this.process_chain)
        await createItem.bind(this)( this.model)

      } catch (err) {
        console.log(err)
        throw err;
      }
  
    }
  }
    //  let prom = diff.map(i => {

    //  })
    //  throw 'dupa'













