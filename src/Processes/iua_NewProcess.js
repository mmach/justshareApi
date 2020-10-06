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
export default class IUA_NewProcess extends BaseProcess {
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








  async sendMail(mail_type, user_src, user_dest) {
    let catsOptions = {};
    this.model.item.itemCategoryOption.forEach(i => {
      if (i.dim) {

        catsOptions[i.dim] = ShowOptionValue(i, this.model.item.itemCategoryOption, this.context.language)
      }
    })
    let model = {
      to_user_msg: this.model.message,
      src_user:
      {
        name: user_src.name,
        phone: user_src.phone,
        img: user_src.blob_profile && CONFIG.BLOB_LINK + "blob/" + user_src.blob_profile.blob_thumbmail_id + ".png"
      },
      dest_user:
      {

        name: user_dest.name,
        phone: user_dest.phone,
        img: user_dest.blob_profile && CONFIG.BLOB_LINK + "blob/" + user_dest.blob_profile.blob_thumbmail_id + ".png"
      },


      items: [
        {
          id: this.model.item.id,
          longigute: this.model.item.longitude,
          latitude: this.model.item.latitude,
          item_title: this.model.name,
          img: this.model.item.blobs.map(i => {
            return { url: CONFIG.BLOB_LINK + "blob/" + i.blob_id + ".png" }
          }),
          categoriesValue: catsOptions
        }
      ]

    }
    //TO UNCOMMENT
    await this.mailSenderDI.setContext(this.context).mailSend({
      type: mail_type,
      model: model,
      email_to: user_dest.email,
      language: user_dest.language
    });
  }




  async action() {

    let { item, esItem } = await initCreateIUAProcess.bind(this)(this.model.item)
    if (!checkSum.bind(this)(item, esItem)) {
      return
    }

    let { iua_id, uniq_number } = await createIUA.bind(this)(item, this.model.action_id, this.model.message)

    let user = await this.userServiceDI.setContext(this.context).getUserInfo({ user_id: item.user_id });

    await this.sendMail('NEW_IUA_MAIL', this.context.user, user)


    await this.sendMail('NEW_IUA_SOURCE_MAIL', user, this.context.user)

    await createConversation.bind(this)(iua_id, uniq_number, user);
    
    return {
      iua_id: iua_id,
      item_id: this.model.item_id
    }
  }
}










