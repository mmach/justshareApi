import BaseCommand from "../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import ItemService from "../../Services/itemService.js";
import {ItemDTO,BlobBase64DTO} from "justshare-shared";
import BlobService from "../../Services/blobService.js";
import CategoryService from "../../Services/categoryService.js";
import BlobValidators from "../../Validators/blobValidators.js";
import Promise from "bluebird";
("use strict");

export default class CreateItemCommand extends BaseCommand {
  /**
   * Creates an instance of CreateItemCommand.
   * @param   {{ logFileInfrastructureDI:LogFileInfrastructure ,
   * authInfrastructureDI:AuthInfrastucture,
   * dbTransactionInfrastuctureDI:DbTransactionInfrastucture,
   * itemServiceDI:ItemService,
   * blobServiceDI:BlobService,
   * categoryServiceDI:CategoryService}}
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
    projectInfrastructureDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      projectInfrastructureDI
    });
    this.itemServiceDI = itemServiceDI;
    this.blobServiceDI = blobServiceDI;
    this.categoryServiceDI = categoryServiceDI;
  }

  get validation() {
    let funcList = [];
    this.model.blobs.forEach(item => {
      let blob = Object.assign(new BlobBase64DTO(), item);
      funcList.push(() => {
        return BlobValidators.checkUploadedFileType.bind(this)(blob);
      });
      funcList.push(() => {
        return BlobValidators.getSizeOfUplodedFile.bind(this)(blob);
      });
    });
    return funcList;
  }
  init(dto) {
    this.model = Object.assign(new ItemDTO(), dto);
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
    let clob_pl = "";
    let clob_us = "";
    this.model.categories.forEach(item => {
      clob_pl += (item.category_pl ? item.category_pl : item.category) + ";";

      clob_us += (item.category_us ? item.category_us : item.category) + ";";
    });
    if (this.context.user.language == "pl") {
      clob_pl += this.model.name + ";";
      clob_pl += this.model.description + ";";
    } else if (this.context.user.language == "us") {
      clob_us += this.model.name + ";";
      clob_us += this.model.description + ";";
    }
    this.model.user_id = this.context.user.id;
    this.model.clobSearch_us = clob_us;
    this.model.clobSearch_pl = clob_pl;
  }
  async action() {
    this.createSearchClob();
    let item = await this.itemServiceDI.setContext(this.context).insert({ model: this.model,withProject:true });
    await this.insertBlobs(item.id);
    await this.insertCategories(item.id);

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}