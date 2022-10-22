import BaseProcess from "../Architecture/baseProcess.js";
import AuthInfrastucture from "../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/blobService.js";
import CategoryService from "../Services/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";




("use strict");
export default class IUA_CloseAllChildrenIUAProcess extends BaseProcess {
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
    const childrens = await this.itemTransactionsServiceDI.setContext(this.context).getAllChildrenIUA({ iua_id: this.model.iua_id })

    return {
      invoke: [
        childrens.map(iua => {
          return {
            iua_id: iua.id,
            process_chain_id: iua.process_chain_id,
            process_id: iua.process_id
          }
        })
      ],
      close: true
    }
  }
}










