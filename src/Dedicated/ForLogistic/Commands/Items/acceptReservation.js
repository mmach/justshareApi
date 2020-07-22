
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
    closingInfrastructureDI,
    projectInfrastructureDI
  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      closingInfrastructureDI,
      projectInfrastructureDI
    });
    this.itemServiceDI = itemServiceDI;
    this.clobs = {}
  }

  get validation() {
    let funcList = [];
    
    return funcList;
  }
  init(dto) {
    this.model = Object.assign(new ItemDTO(), dto);
    this.model.is_elastic_sync = false;

  }

  async action() {
    // console.log(this.model);
  
    // let item = await this.itemServiceDI.setContext(this.context).getItem({ uids: [this.model.id] });
    // this.model.item=item[0]
    // this.closingInfrastructureDI.addClosingFunction(
    //   this.elasticClosingFunc.bind(this)
    // )
    //await this.insertCategories(item.id);

    //  console.log(categories);
    //  this.itemServiceDI.auth(this.authData);
    //  return categories;
  }
}
