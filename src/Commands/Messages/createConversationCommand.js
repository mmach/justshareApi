import { v4 } from "uuid";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../Services/blob/implementations/blobService.js";
import CategoryService from "../../Services/category/implementations/categoryService.js";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import ItemService from "../../Services/item/itemService.js";
import TagService from './../../Services/tagService.js';

export default class CreateConversationCommand extends BaseCommand {
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
    itemUserActionServiceDI,
    validationInfrastructureDI,
    closingInfrastructureDI,
    projectInfrastructureDI,

    itemTransactionsServiceDI,

    conversationServiceDI,
    translationServiceDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      closingInfrastructureDI,
      projectInfrastructureDI,
    });
    this.conversationServiceDI = conversationServiceDI


  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }


  async action() {

    await this.conversationServiceDI.setContext(this.context).createConversation({
      id: v4(),
      user_owner_id: this.context.user.id,
      message: this.model.message,
      user_dest_id: this.model.item.user_id,
      title: this.model.title,
      iua_id: this.model.iua_id
    })

    // console.log(res)

    //await Promise.all(prom)
  }
  //  let prom = diff.map(i => {

  //  })
  //  throw 'dupa'



}


