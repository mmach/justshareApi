import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/Blobs/implementations/blobService.js';
import { PrivilegesDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';
import CategoryService from '../../Services/Categories/categoryService.js';


export default class GetPrivilegesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, privilegeServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI, 
        //    authInfrastructureDI,
            projectInfrastructureDI });
        this.privilegeServiceDI = privilegeServiceDI

    };
    init(dto) {
        this.model = Object.assign(new PrivilegesDTO(), dto);
    }
    async action() {
     return   await this.privilegeServiceDI.setContext(this.context).getPrivileges({});
    }
};
