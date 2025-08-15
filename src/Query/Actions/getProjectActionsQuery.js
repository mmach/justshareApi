import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/item/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blob/implementations/blobService.js';
import {ActionsProjectDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/category/implementations/categoryOptionService.js';
import CategoryService from '../../Services/category/implementations/categoryService.js';


export default class GetProjectActionsQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, actionProjectServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI,
            dbTransactionInfrastuctureDI,
            //     authInfrastructureDI,
            projectInfrastructureDI
        });
        this.actionProjectServiceDI = actionProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new ActionsProjectDTO(), dto);
    }
    async action() {
       return  await this.actionProjectServiceDI.setContext(this.context).getActions({  })
        // await this.categoryServiceDI.setContext(this.context).removeCategory({ id:this.model.id });

    }
};
