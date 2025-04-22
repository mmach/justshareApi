import { StatusesList } from 'justshare-shared';
import { v4 } from "uuid";
import {BaseCommand} from "../../../../Architecture/Base/baseCommand.js";
import {AuthInfrastucture}from "../../../../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../../../../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../../../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../../../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../../../Services/Blobs/implementations/blobService.js";
import CategoryService from "../../../../Services/Categories/categoryService.js";
import ElasticSearchService from "../../../../Services/elasticSearchService.js";
import ItemService from "../../../../Services/itemService.js";



("use strict");

export default class ItemActionsReservationPaidCommand extends BaseCommand {
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
    elasticSearchServiceDI,
    categoryServiceDI,
    categoryOptionServiceDI,
    itemTransactionsServiceDI,
    mailSenderDI,
    userServiceDI,
    conversationServiceDI,
    statusProjectServiceDI,
    dimensionsProjectServiceDI,
    itemServiceDI

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

      let IUA = await this.itemUserActionServiceDI.setContext(this.context).getById({ id: this.model.iua_id, withProject: true })
      let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.PAID })
      //   let itemTransaction = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({ iua_id: [IUA.id], status_id: undefined });

      //   itemTransaction[0].categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: itemTransaction[0].category.id })
      // let ids = itemTransaction[0].categories.map(item => { return item.id });
      /// let catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });

      let id = v4();
      await this.itemUserActionServiceDI.setContext(this.context).insert({
        model: {
          ...IUA,
          id: id,
          iua_id: IUA.id,
        }, withProject: true,
      })
      await this.itemUserActionServiceDI.setContext(this.context).update({
        model: {
          ...IUA,
          comment: this.model.message,
          user_id: this.context.user.id,
          status: 'P',
          iua_prev_id: id,
          status_id: status.id,
          created_date: new Date()

        }, withProject: true
      })
      await this.conversationServiceDI.setContext(this.context).sendMessageToUser({ iua_id: IUA.id, msg_id: this.model.msg_id, msg: this.model.message, syncSocket: true });

      await this.itemTransactionsServiceDI.setContext(this.context).setStatus({ iua_id: IUA.id, status_id: status.id });
      //await this.conversationServiceDI.setContext(this.context).closeConversation({ iua_id: IUA.id });

      // await this.elasticSearchServiceDI.setContext(this.context).addToQueue({ item_id: IUA.item_id, operation: 'U' })

    } catch (err) {
      console.log(err)
      throw err;
    }

  }

}   //await Promise.all(prom)

  //  let prom = diff.map(i => {

  //  })
  //  throw 'dupa'






