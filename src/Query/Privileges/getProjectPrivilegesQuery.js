import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import { PrivilegesProjectDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';


export default class GetProjectPrivilegesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, privilegeProjectServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI,
          //   authInfrastructureDI,
              projectInfrastructureDI });
        this.privilegeProjectServiceDI = privilegeProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new PrivilegesProjectDTO(), dto);
    }
    async action() {
       return await this.privilegeProjectServiceDI.setContext(this.context).getPrivileges({});

    }
};
