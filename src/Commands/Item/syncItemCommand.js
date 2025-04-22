import Promise from "bluebird";
import { ItemDTO } from "justshare-shared";
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../Services/Blobs/implementations/blobService.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import ElasticSearchService from "../../Services/elasticSearchService.js";
import ItemService from "../../Services/itemService.js";
import TagService from './../../Services/tagService.js';


("use strict");

export default class SyncItemCommand extends BaseCommand {
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
      //dbTransactionInfrastuctureDI,
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
    this.projectInfrastructureDI.allowForAllProjects();
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


  async addToQueue() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var expired = new Date(Date.now() + 120965);
    var dateExpired = expired.getFullYear() + '-' + (expired.getMonth() + 1) + '-' + expired.getDate();
    let array = this.model.map(async item => {
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
      console.log(item.expired_date);
      return await this.elasticSearchServiceDI.setContext(this.context).toQueueItemDoc({
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
    });
    return await Promise.all(array)

  }



  async action() {
    // console.log(this.model);
    this.model = await this.itemServiceDI.setContext(this.context).getItem({ toSync: 0 });

    // console.log(JSON.stringify(this.model));
    //  let addToQueue = this.addToQueue.bind(this);

    // let queue = await addToQueue();

    await Promise.mapSeries(this.model, async (item) => {
      try {
        this.context.project.id = item.project_id;
       let obj =  await this.elasticSearchServiceDI.setContext(this.context).addToQueue({ item_id: item.id })

      } catch (er) {
        console.log(er)
      }

    })

    /*
    await new Promise((res, rej) => {
      amqp.connect(CONN_URL, function (err, conn) {
        if (err) {
          throw err;
        }
        conn.createChannel(async function (err2, channel) {
          if (err2) {
            throw err2;
          } ch = channel;
          channel.assertQueue('elastic-item', {
            durable: true
          });

          let queue = await addToQueue();
          //   console.log(queue);
          queue.forEach(item => {
            let test = ch.sendToQueue('elastic-item', new Buffer(JSON.stringify(item)), { persistent: true });
          });
          //  console.log(test);
          res();
          //  ch.close();

        });

        setTimeout(() => {
          conn.close();

        }, 60000)
      });
    });*/
    // this.closingInfrastructureDI.addClosingFunction(
    //  this.elasticClosingFunc.bind(this)
    // )
    /*
        this.closingInfrastructureDI.addClosingFunction(
          this.elasticClosingFunc.bind(this)
        )*/
    //await this.insertCategories(item.id);

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}
