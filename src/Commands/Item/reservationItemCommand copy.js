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
    categoryOptionServiceDI,
    dimensionsProjectServiceDI,
    itemTransactionCategoryOptionsServiceDI,
    itemTransactionsServiceDI,
    mailSenderDI,
    userServiceDI,
    conversationServiceDI,
    translationServiceDI,
    statusProjectServiceDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      closingInfrastructureDI,
      projectInfrastructureDI,
      itemTransactionsServiceDI
    });
    this.itemUserActionServiceDI = itemUserActionServiceDI;
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.categoryOptionServiceDI = categoryOptionServiceDI
    this.dimensionsProjectServiceDI = dimensionsProjectServiceDI;
    this.itemTransactionCategoryOptionsServiceDI = itemTransactionCategoryOptionsServiceDI;
    this.itemTransactionsServiceDI = itemTransactionsServiceDI;
    this.mailSenderDI = mailSenderDI
    this.userServiceDI = userServiceDI;
    this.conversationServiceDI = conversationServiceDI
    this.translationServiceDI = translationServiceDI;
    this.statusProjectServiceDI = statusProjectServiceDI;


  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };
    this.model.is_elastic_sync = false;

  }


  async action() {
    let result = await this.elasticSearchServiceDI.setContext(this.context).getItemById({
      item_id: this.model.item.id,
    })
    let itemsResult = { item_id: result.data["_id"], user_id: result.data["_source"].user_id, item: JSON.parse(result.data["_source"].item) }
    let ids = result.data["_source"].categories.map(item => { return item.id });
    let catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
    let dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});


    let fromUrl = this.model.item.itemCategoryOption.filter(item => { return item.cat_opt_temp.is_from_url == true }).map(item => { return { id: item.co_temp_id, val: item.value } })
    let res = BuildItem(itemsResult.item, catOptions, fromUrl, dimensions, this.context.language)
    // console.log(res)
    let r = itemsResult.item.itemCategoryOption.filter(i => {
      return this.model.item.itemCategoryOption.filter(l => { return i.co_temp_id == l.co_temp_id && i.value == l.value }).length > 0
    })
    let user = await this.userServiceDI.setContext(this.context).getUserInfo({ user_id: this.model.item.user_id });
    let uniq_number = new Date().getTime()
    if (r.length == res.itemCategoryOption.length) {
      let uai_id = v4()
      let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.NEW })
      await this.itemUserActionServiceDI.upsert({
        model: {
          id: uai_id,
          item_id: this.model.item.id,
          user_id: this.context.user.id,
          action_id: this.model.action_id,
          status: 'N',
          comment: this.model.message,
          uniq_number: uniq_number,
          status_id: status.id,
          created_date: new Date()

        },
        withProject: true

      })
      let transaction_id = v4()

      await this.itemTransactionsServiceDI.upsert({
        model: {


          ...this.model.item,
          id: transaction_id,
          item_id: this.model.item.id,
          iua_id: uai_id

        },
        withProject: true

      })


      await this.itemTransactionCategoryOptionsServiceDI.bulkInsert({
        model: res.itemCategoryOption.map(i => {
          return {

            ...i,
            id: v4(),
            itemTransaction_id: transaction_id,
            item_id: this.model.item.id,
            iua_id: uai_id

          }
        }),
        withProject: true
      })


      let catsOptions = {};
      this.model.item.itemCategoryOption.forEach(i => {
        if (i.dim) {

          catsOptions[i.dim] = ShowOptionValue(i, this.model.item.itemCategoryOption, user.language)
        }
      })
      let model = {
        to_user_msg: this.model.message,
        src_user:
        {
          name: this.context.user.name,
          phone: this.context.user.phone,
          img: this.context.user.blob_profile && CONFIG.BLOB_LINK + "blob/" + this.context.user.blob_profile.blob_thumbmail_id + ".png"
        },
        dest_user:
        {
          name: user.name,
          phone: user.phone,
          img: user.blob_profile && CONFIG.BLOB_LINK + "blob/" + user.blob_profile.blob_thumbmail_id + ".png"
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
      await this.mailSenderDI.setContext(this.context).mailSend({
        type: 'RESERVATION_MAIL',
        model: model,
        email_to: user.email,
        language: user.language
      });





      catsOptions = {};
      this.model.item.itemCategoryOption.forEach(i => {
        if (i.dim) {

          catsOptions[i.dim] = ShowOptionValue(i, this.model.item.itemCategoryOption, this.context.language)
        }
      })
      model = {
        to_user_msg: this.model.message,
        src_user:
        {
          name: user.name,
          phone: user.phone,
          img: user.blob_profile && CONFIG.BLOB_LINK + "blob/" + user.blob_profile.blob_thumbmail_id + ".png"
        },
        dest_user:
        {

          name: this.context.user.name,
          phone: this.context.user.phone,
          img: this.context.user.blob_profile && CONFIG.BLOB_LINK + "blob/" + this.context.user.blob_profile.blob_thumbmail_id + ".png"
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
        type: 'RESERVATION_SOURCE_MAIL',
        model: model,
        email_to: this.context.user.email,
        language: this.context.language
      });
      //let transalte = await this.translationServiceDI.setContext(this.context).getTokens({ code: 'LABEL', token: 'RESERVATION_MESSAGE_TITLE' })

      await this.conversationServiceDI.setContext(this.context).createConversation({
        id: v4(),
        user_owner: this.context.user,
        message: this.model.message,
        user_dest: [user],
        iua_id: uai_id,
        title: "IUA." + uniq_number



      })
    }    //await Promise.all(prom)
  }
  //  let prom = diff.map(i => {

  //  })
  //  throw 'dupa'



}


