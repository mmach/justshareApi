import BaseCommand from "../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import ItemService from "../../Services/itemService.js";
import { ItemDTO, BuildItem, ShowOptionValue } from "justshare-shared";
import BlobService from "../../Services/blobService.js";
import CategoryService from "../../Services/categoryService.js";
import Promise from "bluebird";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import TagService from './../../Services/tagService.js'
import ClosingInfrastructure from "../../Architecture/Infrastructure/closingInfrastructure.js";
import { uuid, isUuid } from "../../../node_modules/uuidv4/build/lib/uuidv4.js";
import CONFIG from "../../config.js";
import BaseQuery from "../../Architecture/baseQuery.js";

export default class GetConversationQuery extends BaseQuery {
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

    validationInfrastructureDI,
    closingInfrastructureDI,
    projectInfrastructureDI,



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
    return await this.conversationServiceDI.setContext(this.context).getUserConversation({ conv_id: this.model.conv_id, last_msg: this.model.last_msg_id, size: this.model.size })
  }




}

