import { SearchItemDTO } from 'justshare-shared';
import { BaseQuery } from '../../Architecture/Base/baseQuery.js';
import { LogFileInfrastructure } from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import BlobService from '../../Services/Blobs/blobService.js';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';
import CategoryService from '../../Services/Categories/categoryService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import ItemService from '../../Services/itemService.js';


export default class SearchItemQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemQuery
     */
    constructor({ logFileInfrastructureDI, projectInfrastructureDI, itemServiceDI, authInfrastructureDI, elasticSearchServiceDI, blobServiceDI, categoryOptionServiceDI, categoryServiceDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
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
        let catoptionsAll = []
        if (this.model.category_id != undefined && this.model.category_id != '') {
            let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: this.model.category_id })
            let ids = categories.map(item => { return item.id });
            catoptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
            catoptionsAll = catoptions;
            catoptions = catoptions.filter(item => { return item.is_searchable == true || item.category_link[0].is_searchable == true })
        }
        console.log(this.model)
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
            catoptionsAll: catoptionsAll,
            size: this.model.size != undefined ? this.model.size : 600,
            itemId: this.model.item_id,
            page: this.model.page,
            user_id: this.model.user_id,
            withExpired: this.model.withExpired
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
            total: total
        }
        //return await this.itemServiceDI.setContext(this.context).searchItem({ search: this.model });




    }
};
