import BaseProcess from "../Architecture/Base/baseProcess.js";
import {AuthInfrastucture}from "../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/Blobs/blobService.js";
import CategoryService from "../Services/Categories/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";
import initIUAProcess from "./commonFunctions/initIUAProcess.js";




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
    blobServiceDI,
    processServiceDI

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
    this.processServiceDI = processServiceDI

  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }

  async action() {
    const { IUA, itemTransaction } = await initIUAProcess.bind(this)()

    const item = itemTransaction.iua_context_list.find(i => i.is_main_iua == true)
    let processes = await this.processServiceDI.setContext(this.context).getProcess({ id: itemTransaction.iua_context_list.map(i => i.process_id) });
    const main_chain_action_process = processes.find(i => i.id == item.process_id).process_chain.find(i => i.id == item.process_chain_id).process_chain_actions.filter(i => i.action_type == 'PROCESS')
    // processes.filter()
    processes.filter(i => i.id == main_chain_action_process.map(i => i.external_process_id))
   // itemTransaction.iua_context_list.filter(i => main_chain_action_process.map(i => i.external_process_id))

    //itemTransaction.iua_context_list.filter(i=>main_chain_action_process.filter(action=>action.external_process_id==i.process_id).length>0).map(i=>{
    let has_closed =     itemTransaction.iua_context_list.filter(i=>main_chain_action_process.filter(action=>action.external_process_id==i.process_id).length>0).map(i => {
      let result = { process_chain_id: i.process_chain_id, is_last: false }
      processes.find(element => element.id == i.process_id).process_chain.forEach(process_children => {
        if (process_children.id == i.process_chain_id) {
          result.is_last = process_children.is_last == true
        }
      })
      return result
    })
    console.log(has_closed);
    console.log(this)
    //.filter(i =>i.process_chain_id!=)
    const parent = await this.itemTransactionsServiceDI.setContext(this.context).getIuaParent({ iua_id: this.model.iua_id })

   // throw 'dupa'
    console.log(parent)

    // let user = await this.userServiceDI.setContext(this.context).getUserInfo({ user_id: item.user_id });

    // await createConversation.bind(this)(iua_id, uniq_number, user);
    if (has_closed.filter(i => i.is_last == false).length == 0) {
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
    else {
      return {
        invoke: [
          
        ],
        edge_path: false
      }

    }
  }
}










