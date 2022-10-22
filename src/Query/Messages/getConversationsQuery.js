import BaseQuery from "../../Architecture/baseQuery.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../Services/blobService.js";
import CategoryService from "../../Services/categoryService.js";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import ItemService from "../../Services/itemService.js";
import TagService from './../../Services/tagService.js';

export default class GetConversationsQuery extends BaseQuery {
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


    conversationMessageMembersServiceDI,
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
    this.conversationMessageMembersServiceDI = conversationMessageMembersServiceDI


  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }


  async action() {
    return await this.conversationMessageMembersServiceDI.setContext(this.context).getConversations({conv_id:this.model.conv_id, page: this.model.page, size: this.model.size })
  }




}


