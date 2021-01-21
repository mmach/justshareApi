import BaseQuery from '../../Architecture/baseQuery.js';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import ItemService from '../../Services/itemService.js';
import ElasticSearchService from '../../Services/elasticSearchService.js';
import BlobService from '../../Services/blobService.js';
import { ToTranslateDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryService from '../../Services/categoryService.js';
import translate from 'google-translate-free';
import CONFIG from "../../config.js";

export default class TranslateQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, itemServiceDI:ItemService ,elasticSearchServiceDI:ElasticSearchService,blobServiceDI:BlobService,categoryOptionServiceDI:CategoryOptionService,CategoryService,categoryServiceDI:CategoryService}}
     * @memberof GetItemByIdQuery
     */
    constructor({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });

    };

    init(dto) {
        this.model = Object.assign(new ToTranslateDTO(), dto);
    }

    async action() {
        let lang = this.context.language
        if (lang == 'zh_cn') {
            lang = 'zh';
        } else if (lang == 'us') {
            lang = 'en';
        }
        let destlang = this.model.langTo.toUpperCase()

        if (destlang == 'ZH_CN') {
            destlang = 'zh';
        } else if (destlang == 'US') {
            destlang = 'en';
        }
        

        let text = await translate(this.model.src,
            {
            //    engine: CONFIG.TRANSLATE.engine, key: CONFIG.TRANSLATE.key,
                from: lang, to: destlang
            })

        return text.text;
        //return await this.itemServiceDI.setContext(this.context).searchItem({ search: this.model });
    }
};
