import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import SearchItemDTO from '../../Shared/DTO/Item/SearchItemDTO';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import BlobBase64DTO from '../../Shared/DTO/Blob/BlobBase64DTO.js';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';


export default class SearchItemQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemQuery
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

    async getItems(uids) {

        let resultList = await this.itemServiceDI.setContext(this.context).getItem({ uids: uids });
        resultList = resultList.map(async result => {
            if (result.blobs.length > 0) {
                console.log(result);
                let blobsResulst = await Promise.all(result.blobs.map(async item => {
                    return await this.blobServiceDI.getBlobsBase64ByGuids({
                        ids: [item.blob_min.id]
                    });
                }));
                // let blobBase64 = blobsResulst.filter(element => {
                //     return result.blobs.blob_thumbmail.id == element.id
                // })[0]
                result.blobs = result.blobs.map(item => {
                    let blobBase64 = blobsResulst.filter(element => {

                        return item.blob_min.id == element[0].id
                    })[0]
                    item.blob_min = Object.assign(new BlobBase64DTO(), blobBase64[0]);
                    return item;
                })
                return result;
            }
            return result;

        })
        return await Promise.all(resultList);

    }
    async action() {
        console.log(this.model)
        let catoptions = []
        if (this.model.category_id != undefined && this.model.category_id != '') {
            let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: this.model.category_id })
            let ids = categories.map(item => { return item.id });
            catoptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({category_ids:ids  });
            catoptions=catoptions.filter(item=>{return item.is_searchable==true})
            console.log(catoptions);
        }
        let result = await this.elasticSearchServiceDI.setContext(this.context).searchDoc({
            latitude: this.model.lat,
            longitude: this.model.lon,
            text: this.model.freetext,
            distance: this.model.distance,
            categories: [this.model.category_id],
            tags: this.model.tag != undefined ? this.model.tag : undefined,
            startDate: this.model.startDate,
            endDate: this.model.endDate,
            createdInterval: this.model.createdInterval,
            catOptionsFilter:this.model.catOptions,
            catoptions:catoptions
        })
        let itemsResult = result.data.hits.hits.map(item => {
            return { item_id: item["_id"], user_id: item["_source"].user_id, item: JSON.parse(item["_source"].item) }
        })
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
            items: JSON.stringify(resultDB)

        }
        //return await this.itemServiceDI.setContext(this.context).searchItem({ search: this.model });




    }
};
