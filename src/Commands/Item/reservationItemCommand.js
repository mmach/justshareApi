import { BuildItem, ShowOptionValue, StatusesList } from "justshare-shared";
import { v4 } from "uuid";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CONFIG from "../../config.js";
import BlobService from "../../Services/blob/implementations/blobService.js";
import CategoryService from "../../Services/category/implementations/categoryService.js";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import ItemService from "../../Services/item/itemService.js";
import TagService from './../../Services/tagService.js';

export default class ReservationItemCommand extends BaseCommand {
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
    invoiceServiceDI,
    itemTransactionCategoryOptionsServiceDI,
    blobServiceDI

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





  async initCreateIUAProcess(item) {
    let result = await this.elasticSearchServiceDI.setContext(this.context).getItemById({
      item_id: item.id,
    })
    let itemsResult = { item_id: result.data["_id"], user_id: result.data["_source"].user_id, item: JSON.parse(result.data["_source"].item) }
    let ids = result.data["_source"].categories.map(item => { return item.id });
    let catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
    let dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});

    let fromUrl = item.itemCategoryOption.filter(item => { return item.cat_opt_temp.is_from_url == true }).map(item => { return { id: item.co_temp_id, val: item.value } })
    let res = BuildItem(itemsResult.item, catOptions, fromUrl, dimensions, this.context.language)
    return { item: item, esItem: res }
  }

  checkSum(item, esItem) {
    let r = esItem.itemCategoryOption.filter(i => {
      return item.itemCategoryOption.filter(l => { return i.co_temp_id == l.co_temp_id && i.value == l.value }).length > 0
    })
    return r.length == esItem.itemCategoryOption.length
  }


  async createIUA(item, action_id, message) {

    let uniq_number = new Date().getTime()
    let iua_id = v4()
    let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.NEW })
    await this.itemUserActionServiceDI.upsert({
      model: {
        id: iua_id,
        item_id: item.id,
        user_id: this.context.user.id,
        action_id: action_id,
        status: 'N',
        comment: message,
        uniq_number: uniq_number,
        status_id: status.id,
        created_date: new Date()

      },
      withProject: true

    })
    let transaction_id = v4()

    await this.itemTransactionsServiceDI.upsert({
      model: {


        ...item,
        id: transaction_id,
        item_id: item.id,
        iua_id: iua_id

      },
      withProject: true

    })

    await this.itemTransactionCategoryOptionsServiceDI.bulkInsert({
      model: item.itemCategoryOption.map(i => {
        return {

          ...i,
          id: v4(),
          itemTransaction_id: transaction_id,
          item_id: item.id,
          iua_id: iua_id

        }
      }),
      withProject: true
    })
    return { iua_id, uniq_number }

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


  async createConversation(iua_id, uniq_number, user) {
    await this.conversationServiceDI.setContext(this.context).createConversation({
      id: v4(),
      user_owner: this.context.user,
      message: this.model.message,
      user_dest: [user],
      iua_id: iua_id,
      title: "IUA." + uniq_number
    })
  }

  async action() {

    let { item, esItem } = await this.initCreateIUAProcess(this.model.item)
    if (!this.checkSum(item, esItem)) {
      return
    }

    let { iua_id, uniq_number } = await this.createIUA(item, this.model.action_id, this.model.message)

    let user = await this.userServiceDI.setContext(this.context).getUserInfo({ user_id: item.user_id });

    await this.sendMail('RESERVATION_MAIL', this.context.user, user)


    await this.sendMail('RESERVATION_SOURCE_MAIL', user, this.context.user)

    await this.createConversation(iua_id, uniq_number, user);
  }
}



