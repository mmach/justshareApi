import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import { BlobBase64DTO, SearchItemDTO, ItemDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';


export default class GetItemSensorByValueAndMacDimQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, projectInfrastructureDI, elasticSearchServiceDI, blobServiceDI, categoryOptionServiceDI, categoryServiceDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });
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

        this.model.dim = 'DEVICE_MAC'

        let catoptions = []
        let itemCategorytion = await this.itemServiceDI.setContext(this.context).searchItemCategoryByValueAndDimQuery({
            value: this.model.value,
            dim_name: this.model.dim
        })

        if (itemCategorytion.length == this.model.value.length && this.model.value.length > 0) {
            this.context.project = {
                id: itemCategorytion[0].project_id
            }
            let result = await this.elasticSearchServiceDI.setContext(this.context).getItemById({
                item_id: itemCategorytion[0].item_id,
            })
            let itemsResult = { item_id: result.data["_id"], user_id: result.data["_source"].user_id, item: JSON.parse(result.data["_source"].item) }

            let resultDB = itemsResult.item;

            return resultDB
        }

        //return await this.itemServiceDI.setContext(this.context).searchItem({ search: this.model });




    }
};
