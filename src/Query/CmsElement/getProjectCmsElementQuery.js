import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/Blobs/implementations/blobService.js';
import { DimensionsDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';
import CategoryService from '../../Services/Categories/categoryService.js';


export default class GetCmsElementQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, projectInfrastructureDI, cmsElementsProjectServiceDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });
        this.cmsElementsProjectServiceDI = cmsElementsProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new DimensionsDTO(), dto);
    }
    async action() {
        return await this.cmsElementsProjectServiceDI.setContext(this.context).getCmsElementsFlat({ init: this.model.init, ids: this.model.ids });
    }
};
