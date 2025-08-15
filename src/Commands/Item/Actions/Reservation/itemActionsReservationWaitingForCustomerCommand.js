import { StatusesList } from 'justshare-shared';
import { v4 } from "uuid";
import {BaseCommand} from "../../../../Architecture/Base/baseCommand.js";
import {AuthInfrastucture}from "../../../../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../../../../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../../../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../../../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../../../Services/blob/implementations/blobService.js";
import CategoryService from "../../../../Services/category/implementations/categoryService.js";
import ElasticSearchService from "../../../../Services/elasticSearchService.js";
import ItemService from "../../../../Services/item/itemService.js";



("use strict");

export default class ItemActionsReservationWaitingForCustomerCommand extends BaseCommand {
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
    itemServiceDI,
    commentServiceDI

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
    this.commentServiceDI = commentServiceDI;

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

      let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.CLOSED })

  

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
          status: 'W',
          iua_prev_id: id,
          status_id: status.id,
          created_date: new Date()

        }, withProject: true
      })
      let obj = await this.commentServiceDI.setContext(this.context).getByIUA({ iua_id: IUA.id })
      console.log(obj)
      if (obj.length != 1) {
        throw 'PLEASE CONTACT WITH SUPPORT'
      }
      console.log(obj)
      let comment = obj[0];
      await this.commentServiceDI.setContext(this.context).update({
        model: {
          ...comment,
          status: 'V'

        }
      })
      await this.commentServiceDI.setContext(this.context).insert({
        model: {
          id: v4(),
          user_src_id: this.context.user.id,
          iua_id: IUA.id,
          user_id: IUA.user_id,
          comment: this.model.message,
          rate: this.model.rate,
          action_id: IUA.action_id,
          status: 'V'
        }

        , withProject: true
      })

      await this.itemTransactionsServiceDI.setContext(this.context).setStatus({ iua_id: IUA.id, status_id: status.id });
      await this.conversationServiceDI.setContext(this.context).closeConversation({ iua_id: IUA.id });

    } catch (err) {
      console.log(err)
      throw err;
    }

  }

}   //await Promise.all(prom)

  //  let prom = diff.map(i => {

  //  })
  //  throw 'dupa'






