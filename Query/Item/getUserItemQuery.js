import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import { BlobBase64DTO, SearchItemDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';


export default class GetUserItemQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof getUserItemQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, authInfrastructureDI, elasticSearchServiceDI, blobServiceDI, categoryOptionServiceDI, categoryServiceDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.authInfrastructureDI.allowAnonymous();
        this.categoryOptionServiceDI = categoryOptionServiceDI;
        this.itemServiceDI = itemServiceDI;
        this.elasticSearchServiceDI = elasticSearchServiceDI;
        this.blobServiceDI = blobServiceDI
        this.categoryServiceDI = categoryServiceDI;
    };

    init(dto) {
        this.model = Object.assign(new SearchItemDTO(), dto);
    }

   
    async action() {
        let catoptions = []
        if (this.model.category_id != undefined && this.model.category_id != '') {
            let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: this.model.category_id })
            let ids = categories.map(item => { return item.id });
            catoptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
            catoptions = catoptions.filter(item => { return item.is_searchable == true })
            }
        let result = await this.elasticSearchServiceDI.setContext(this.context).searchDoc({
            latitude: this.model.lat,
            longitude: this.model.lon,
            text: this.model.freetext,
            distance: this.model.distance,
            categories: this.model.category_id != undefined ? [this.model.category_id] : undefined,
            tags: this.model.tag,
            startDate: this.model.startDate,
            endDate: this.model.endDate,
            createdInterval: this.model.createdInterval,
            catOptionsFilter: this.model.catOptions,
            catoptions: catoptions,
            size: this.model.size != undefined ? this.model.size : 600,
            itemId: this.model.item_id,
            page: this.model.page

        })
        let itemsResult = result.data.hits.hits.map(item => {
            return { item_id: item["_id"], user_id: item["_source"].user_id, item: JSON.parse(item["_source"].item) }
        })
        let total = result.data.hits.total.value
        let resultDB = itemsResult.map(item => { return item.item });//await this.getItems(itemsResult.map(item => { return item.item_id }));
        resultDB = resultDB.map(item => {
            result.data.hits.hits.forEach(res => {
                if (res['_id'] == item.id) {
                    //console.log(res)
                    //console.log(item)
                    //console.log(res['_source'].categories)

                    item.categories = res['_source'].categories
                }
            })
            return item
        })
        return {
            aggs: result.data.aggregations,
            items: JSON.stringify(resultDB),
            total:total
        }




    }
};
