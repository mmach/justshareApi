import BaseCommand from "../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import ItemService from "../../Services/itemService.js";
import { ItemDTO } from "justshare-shared";
import BlobService from "../../Services/blobService.js";
import CategoryService from "../../Services/categoryService.js";
import Promise from "bluebird";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import TagService from './../../Services/tagService.js'
import v4 from "uuid";
import ClosingInfrastructure from "../../Architecture/Infrastructure/closingInfrastructure.js";
import CONFIG from "../../config.js";


("use strict");

export default class CreateItemCommand extends BaseCommand {
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
    itemServiceDI,
    validationInfrastructureDI,
    categoryServiceDI,
    blobServiceDI,
    elasticSearchServiceDI,
    tagServiceDI,
    closingInfrastructureDI,
    projectInfrastructureDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      closingInfrastructureDI,
      projectInfrastructureDI
    });
    this.itemServiceDI = itemServiceDI;
    this.blobServiceDI = blobServiceDI;
    this.categoryServiceDI = categoryServiceDI;
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.tagServiceDI = tagServiceDI;
    this.clobs = {}
  }

  get validation() {
    let funcList = [];
    /* this.model.blobs.forEach(item => {
       let blob = Object.assign(new BlobBase64DTO(), item);
       funcList.push(() => {
         return BlobValidators.checkUploadedFileType.bind(this)(blob);
       });
       funcList.push(() => {
         return BlobValidators.getSizeOfUplodedFile.bind(this)(blob);
       });
     });*/
    return funcList;
  }
  init(dto) {
    this.model = Object.assign(new ItemDTO(), dto);
    this.model.is_elastic_sync = false;

  }

  async insertCategories(itemId) {
    let categoriesNew = this.model.categories.filter(item => {
      return item.id == undefined || item.id == null;
    });
    let catPromises = categoriesNew.map(async item => {
      return await this.categoryServiceDI
        .setContext(this.context)
        .newCategory({ model: item });
    });
    let result = await Promise.all(catPromises);
    let categories = [];
    result.forEach(item => {
      categories.push(item);
    });
    this.model.categories.forEach(item => {
      if (item.id != undefined && item.id != null) {
        categories.push(item);
      }
    });
    await Promise.mapSeries(categories, categoryElement => {
      return this.itemServiceDI
        .setContext(this.context)
        .insertCategories({ itemId: itemId, categoryId: categoryElement.id });
    });
  }
  async insertBlobs(itemId) {
    await Promise.mapSeries(this.model.blobs, item => {
      return this.blobServiceDI.setContext(this.context).uploadImageAndSave({
        blob: item,
        itemId: itemId
      });
    });
  }

  createSearchClob(itemId) {
    let clobs = {
      pl: "",
      us: "",
      de: "",
      ru: "",
      fr: "",
      es: "",
      no: "",
      zh_cn: ""
    }
    Object.keys(clobs).forEach(item => {
      //clobs[item] += this.model.name + ";";
      // clobs[item] += this.model.description + ";";;
      this.model.catOptions.filter(cat => {
        // console.log(this.model.catOptions);
        // console.log(cat);
        return ['SINGLE', 'SELECT', 'MULTISELECT', 'GEO'].includes(cat.type)
      }).forEach(cat => {
        //console.log(cat)
        //console.log(cat.catOption);
        if ((cat.catOption ? cat.catOption.is_not_in_clob : false) != true) {
          clobs[item] += (cat.select ? cat.select["value_" + item] : cat.val) + " ; "

        }
      })
      this.model.tags.forEach(tag => {
        clobs[item] += tag.label + ' ; ';
      })
    })
    //console.log(clobs)
    Object.keys(clobs).forEach(item => {
      this.model["clobSearch_" + item] = clobs[item];
    })
    //console.log(clobs)
    this.model.user_id = this.context.user.id;
    //this.model.clobSearch_us = clob_us;
    //this.model.clobSearch_pl = clob_pl;
    return clobs;
    //ADD CATEGORIES NAME TOO
    //ADD HASH TAGS
  }

  async elasticClosingFunc() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var expired = new Date(Date.now() + 120965);
    var dateExpired = expired.getFullYear() + '-' + (expired.getMonth() + 1) + '-' + expired.getDate();

    return await this.elasticSearchServiceDI.setContext(this.context).upsertItemDoc({
      item_id: this.model.id,
      longitude: this.model.longitude,
      latitude: this.model.latitude,
      user_id: this.model.user_id,
      clobs: this.clobs,
      title: this.model.name,
      description: this.model.description,
      catOptions: this.model.catOptions,
      status: this.model.status,
      type: this.model.type,
      category: this.model.category_id,
      tags: this.model.tags,
      categories: this.model.categories,
      createdAt: this.model.createdAt ? this.model.createdAt : today.toISOString(),
      expired_at: this.model.expired_at ? this.model.expired_at : expired.toISOString(),
      item: this.model.item,
      project_id: this.model.item.project_id,
      external_id: this.model.item.external_id,
      es_operation: this.model.item.es_operation

    });
  }

  getCategoriesValue() {
    let catOptions = this.model.catOptions.filter(cat => {
      return cat.type == 'GEO';
    });
    if (catOptions) {
      this.model.latitude = catOptions.length > 0 ? catOptions.filter(item => { return item.catOption.order == 2 })[0].val : null
      this.model.longitude = catOptions.length > 0 ? catOptions.filter(item => { return item.catOption.order == 1 })[0].val : null
    }
    this.model.blobs = this.model.catOptions.filter(cat => {
      return cat.type == 'IMAGE';
    }).map(item => { return item.content });


  }
  async tagsInsert() {

    let existTagsArray = this.model.tags.filter(item => {
      return item.id != undefined
    })
    let newTags = this.model.tags.filter(item => {
      return item.id == undefined
    })
    newTags = newTags.map(item => {
      item.id = v4()
      return item
    })
    let idNewTagsArray = await this.tagServiceDI.setContext(this.context).insertUniq({ newTags: newTags });



    let tagsId = [];
    idNewTagsArray.forEach(item => {


      tagsId.push(item);
    })
    existTagsArray.forEach(item => {

      tagsId.push(item.id);
    })

    let tagsArray = await tagsId.map(tag => {
      return this.itemServiceDI.setContext(this.context).insertTag({
        item_id: this.model.id, tag_id: tag
      })
    })

    await Promise.all(tagsArray);
  }



  async addToQueue() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var expired = new Date(Date.now() + 120965);
    var dateExpired = expired.getFullYear() + '-' + (expired.getMonth() + 1) + '-' + expired.getDate();
    let clobs = {
      pl: "",
      us: "",
      de: "",
      ru: "",
      fr: "",
      es: "",
      no: "",
      zh_cn: ""
    }
    let item = this.model;
    clobs = Object.keys(clobs).forEach(clob => {
      return item["clobSearch_" + clob]
    });
    let catOptions = item.itemCategoryOption.map(catValue => {

      return {
        cat_opt_id: catValue.cat_opt_temp.id,
        type: catValue.category_link.catOption.cat_opt.type,
        dataType: catValue.cat_opt_temp.cat_opt_type_template.type,
        order: catValue.cat_opt_temp.order,
        cat_opt_temp_id: catValue.co_temp_id,
        co_id: catValue.cat_opt_temp.co_id,
        val: catValue.value,
        conc: catValue.cat_opt_temp.co_id + ";" + String(catValue.value),
        select: catValue.cat_opt_temp,
        catOption: catValue.cat_opt_temp

      }
    })
    try {
      let newItem = await this.elasticSearchServiceDI.setContext(this.context).toQueueItemDoc({
        item_id: item.id,
        longitude: item.longitude,
        latitude: item.latitude,
        user_id: item.user_id,
        clobs: clobs,
        title: item.name,
        description: item.description,
        catOptions: catOptions,
        status: item.status,
        type: item.type,
        category: item.category_id,
        tags: item.tags.map((tag) => { return { label: tag.tag } }),
        categories: item.categories,
        createdAt: item.createdAt ? item.createdAt : today.toISOString(),
        expired_at: (item.expired_date != undefined && item.expired_date != null) ? item.expired_date : expired.toISOString(),
        item: item,
        project_id: item.project_id,
        es_operations: item.es_operations,
        external_id: item.external_id
      });
      global.queueChannel.publish(CONFIG.ITEM_ES_QUEUE, this.context.project.id,
        newItem
        , {
          contentType: 'application/json', persistent: true, expiration: 20 * 1000, messageId: this.model.id, headers: {
            Authorization: 'Bearer ' + this.token,
            ProjectAuthorization: 'Bearer ' + this.projectToken
          }
        }
      )
    } catch (er) {
      console.log(er)
    }
  }


  async action() {
    console.log(this.model);
    this.clobs = this.createSearchClob.bind(this)();
    this.getCategoriesValue.bind(this)();
    this.model.categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: this.model.category_id })
    let categories=  [...this.model.categories];
    let cat = this.model.categories.filter(item => { return item.id == this.model.category_id })[0]

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + (cat.expired_day != null ? Number(cat.expired_day) : 5000));
    this.model.expired_date = tomorrow
    this.model.es_operations = 'I';
    let newItem = await this.itemServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });
    let array = this.model.catOptions.map(item => {
      return this.itemServiceDI.setContext(this.context).upsertCategoryOption({ model: item, item_id: this.model.id })
    })

    await Promise.all(array)
    await this.tagsInsert();
    await this.insertBlobs(this.model.id);

    let item = await this.itemServiceDI.setContext(this.context).getItem({ uids: [this.model.id] })
    item=item[0]
    this.model = { ...item,
      categories:categories };
    await this.elasticSearchServiceDI.setContext(this.context).addToQueue({ item_id: this.model.id, operation: 'I' })

    // this.model.item=item[0]
   // this.closingInfrastructureDI.addClosingFunction(
   //   this.addToQueue.bind(this)
  //  )
    //await this.insertCategories(item.id);

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}
