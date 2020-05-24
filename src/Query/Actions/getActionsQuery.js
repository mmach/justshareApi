import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import { ActionsDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';


export default class GetActionsQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, actionServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI,
            dbTransactionInfrastuctureDI,
            //     authInfrastructureDI,
            projectInfrastructureDI
        });
        this.actionServiceDI = actionServiceDI

    };
    init(dto) {
        this.model = Object.assign(new ActionsDTO(), dto);
    }
    async action() {
       return  await this.actionServiceDI.setContext(this.context).getActions({})
        // await this.categoryServiceDI.setContext(this.context).removeCategory({ id:this.model.id });

    }
};
