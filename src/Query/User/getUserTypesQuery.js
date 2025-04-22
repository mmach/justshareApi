import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/Blobs/implementations/blobService.js';
import { UserTypeDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';
import CategoryService from '../../Services/Categories/categoryService.js';


export default class GetUserTypesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({
        logFileInfrastructureDI,
        translationServiceDI,
        userTypesServiceDI,        
        projectInfrastructureDI,
        dbTransactionInfrastuctureDI
    }) {
        super({
            logFileInfrastructureDI,
            
            projectInfrastructureDI,
            dbTransactionInfrastuctureDI
        });
        this.userTypesServiceDI = userTypesServiceDI;
    }
    init(dto) {
        this.model =  dto;
    }

    get validation() {
        return [];
    }

    async action() {
         return await this.userTypesServiceDI.setContext(this.context).getUserType({ model: this.model })
    }
};
