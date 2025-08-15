import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/item/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blob/implementations/blobService.js';
import { BlobBase64DTO, SearchItemDTO,ItemDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/category/implementations/categoryOptionService.js';
import CategoryService from '../../Services/category/implementations/categoryService.js';


export default class GetItemByIdQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, authInfrastructureDI, elasticSearchServiceDI, blobServiceDI, categoryOptionServiceDI, categoryServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI,projectInfrastructureDI });
        this.authInfrastructureDI.allowAnonymous();
        this.categoryOptionServiceDI = categoryOptionServiceDI;
        this.itemServiceDI = itemServiceDI;
        this.elasticSearchServiceDI = elasticSearchServiceDI;
        this.blobServiceDI = blobServiceDI
        this.categoryServiceDI = categoryServiceDI;
    };

    init(dto) {
        this.model = Object.assign(new ItemDTO(), dto);
    }

    async action() {
        let catoptions = []
        if (this.model.category_id != undefined && this.model.category_id != '') {
            let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: this.model.category_id })
            let ids = categories.map(item => { return item.id });
            catoptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
            catoptions = catoptions.filter(item => { return item.is_searchable == true })
            }
        let result = await this.elasticSearchServiceDI.setContext(this.context).getItemById({
                      item_id: this.model.id,
        })
        let itemsResult = { item_id: result.data["_id"], user_id: result.data["_source"].user_id, item: JSON.parse(result.data["_source"].item) }
        
        let resultDB = itemsResult.item ;//await this.getItems(itemsResult.map(item => { return item.item_id }));
       /* resultDB = resultDB.map(item => {
            result.data.hits.hits.forEach(res => {
                if (res['_id'] == item.id) {
                    //console.log(res)
                    //console.log(item)
                    //console.log(res['_source'].categories)

                    item.categories = res['_source'].categories
                }
            })
            return item
        })*/
              //    aggs: result.data.aggregations,
          return   resultDB
    
        //return await this.itemServiceDI.setContext(this.context).searchItem({ search: this.model });




    }
};
