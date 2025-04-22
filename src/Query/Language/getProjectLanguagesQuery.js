import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/Blobs/implementations/blobService.js';
import { LanguageProjectDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';
import CategoryService from '../../Services/Categories/categoryService.js';


export default class GetProjectLanguagesQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, languageProjectServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI, dbTransactionInfrastuctureDI,

            projectInfrastructureDI
        });
        this.languageProjectServiceDI = languageProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new LanguageProjectDTO(), dto);
    }
    async action() {
       return await this.languageProjectServiceDI.setContext(this.context).getProjectLanguages();

    }
};
