import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/Blobs/implementations/blobService.js';
import { BlobBase64DTO, SearchItemDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';
import CategoryService from '../../Services/Categories/categoryService.js';


export default class GetUserItemToSyncQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof getUserItemQuery
     */
    constructor({ logFileInfrastructureDI, itemServiceDI, blobServiceDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
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
