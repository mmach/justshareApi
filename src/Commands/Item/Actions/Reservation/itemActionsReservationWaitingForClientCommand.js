import BaseCommand from "../../../../Architecture/baseCommand.js";
import AuthInfrastucture from "../../../../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../../../../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../../../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../../../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../../../Services/blobService.js";
import CategoryService from "../../../../Services/categoryService.js";
import ElasticSearchService from "../../../../Services/elasticSearchService.js";
import ItemService from "../../../../Services/itemService.js";
import { uuid } from "../../../../../node_modules/uuidv4/build/lib/uuidv4.js";
import { LinkItem, GetValueByDim, DimensionsList ,StatusesList} from 'justshare-shared'



("use strict");

export default class ItemActionsReservationWaitingForClientCommand extends BaseCommand {
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

      let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.WAITING_FOR_RATE_CUSTOMER })
      //   let itemTransaction = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({ iua_id: [IUA.id], status_id: undefined });

      //   itemTransaction[0].categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: itemTransaction[0].category.id })
      // let ids = itemTransaction[0].categories.map(item => { return item.id });
      /// let catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });


      let id = uuid();
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
          status_id: status.id
        }, withProject: true
      })
      await this.commentServiceDI.setContext(this.context).insert({
        model: {
          id: uuid(),
          user_src_id: this.context.user.id,
          iua_id: IUA.id,
          item_id: IUA.item_id,
          comment: this.model.message,
          rate: this.model.rate,
          action_id: IUA.action_id,
          status: 'P'
        }

        , withProject: true
      })

      await this.itemTransactionsServiceDI.setContext(this.context).setStatus({ iua_id: IUA.id, status_id: status.id });

    } catch (err) {
      console.log(err)
      throw err;
    }

  }

}   //await Promise.all(prom)

  //  let prom = diff.map(i => {

  //  })
  //  throw 'dupa'






