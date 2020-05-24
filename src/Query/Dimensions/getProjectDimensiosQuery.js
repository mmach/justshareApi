import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import { DimensionsProjectDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';


export default class GetProjectDimensiosQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, dimensionsProjectServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI, dbTransactionInfrastuctureDI,
            //   authInfrastructureDI,
            projectInfrastructureDI
        });
        this.dimensionsProjectServiceDI = dimensionsProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new DimensionsProjectDTO(), dto);
    }
    async action() {
        return await this.dimensionsProjectServiceDI.setContext(this.context).getDimensions({});

    }
};
