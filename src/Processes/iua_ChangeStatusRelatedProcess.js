import BaseCommand from "../Architecture/baseCommand.js";
import AuthInfrastucture from "../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/blobService.js";
import CategoryService from "../Services/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import { uuid } from "../../node_modules/uuidv4/build/lib/uuidv4.js";
import fs from 'fs';
import ItemService from "../Services/itemService.js";
import BaseProcess from "../Architecture/baseProcess.js";
import { ItemDTO, BuildItem, ShowOptionValue, StatusesList } from "justshare-shared";
import CONFIG from "../config.js";
import checkSum from "./commonFunctions/checkSum.js";
import createConversation from "./commonFunctions/createConversation.js";
import createIUA from "./commonFunctions/createIUA.js";
import initCreateIUAProcess from "./commonFunctions/initCreateIUAProcess.js";




("use strict");
export default class IUA_ChangeStatusRelatedProcess extends BaseProcess {
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
    itemUserActionServiceDI,
    validationInfrastructureDI,
    closingInfrastructureDI,
    projectInfrastructureDI,
    elasticSearchServiceDI,
    categoryServiceDI,
    categoryOptionServiceDI,
    itemTransactionsServiceDI,
    mailSenderDI,
    userServiceDI,
    conversationServiceDI,
    statusProjectServiceDI,
    dimensionsProjectServiceDI,
    itemServiceDI,
    invoiceServiceDI,
    itemTransactionCategoryOptionsServiceDI,
    blobServiceDI

  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      validationInfrastructureDI,
      closingInfrastructureDI,
      projectInfrastructureDI,
    });
    this.itemUserActionServiceDI = itemUserActionServiceDI;
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.itemTransactionsServiceDI = itemTransactionsServiceDI;
    this.mailSenderDI = mailSenderDI
    this.userServiceDI = userServiceDI;
    this.conversationServiceDI = conversationServiceDI
    this.statusProjectServiceDI = statusProjectServiceDI;
    this.dimensionsProjectServiceDI = dimensionsProjectServiceDI;
    this.categoryOptionServiceDI = categoryOptionServiceDI;
    this.categoryServiceDI = categoryServiceDI;
    this.itemServiceDI = itemServiceDI;
    this.invoiceServiceDI = invoiceServiceDI;
    this.blobServiceDI = blobServiceDI;
    this.itemTransactionCategoryOptionsServiceDI = itemTransactionCategoryOptionsServiceDI;

  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }

  async action() {



    const parent = await this.itemTransactionsServiceDI.setContext(this.context).getIuaParent({ iua_id: this.model.iua_id })

    console.log(parent)

    // let user = await this.userServiceDI.setContext(this.context).getUserInfo({ user_id: item.user_id });

    // await createConversation.bind(this)(iua_id, uniq_number, user);

    return {
      invoke: [
        {
          iua_id: parent.id,
          process_chain_id: parent.process_chain_id,
          process_id: parent.process_id
        }
      ],
      edge_path: false
    }
  }
}










