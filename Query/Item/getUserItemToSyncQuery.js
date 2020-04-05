import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import { BlobBase64DTO, SearchItemDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';


export default class GetUserItemToSyncQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof getUserItemQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, blobServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.itemServiceDI = itemServiceDI;
        this.blobServiceDI = blobServiceDI
    };

    init(dto) {
        this.model = Object.assign(new SearchItemDTO(), dto);
    }


    async action() {


        let resultList = await this.itemServiceDI.setContext(this.context).getItemToSync({});

        return {
            items: resultList,
            total: resultList.length
        }




    }
};
