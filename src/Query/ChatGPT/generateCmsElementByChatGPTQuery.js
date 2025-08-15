"use strict";

import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import CategoryService from '../../Services/category/implementations/categoryService.js';
import CategoryOptionService from '../../Services/category/implementations/categoryOptionService.js';




class GenerateCmsElementByChatGPTQuery extends BaseQuery {
    /**
       * Creates an instance of GetDictionariesQuery.
       * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryOptionServiceDI:CategoryOptionService,categoryServiceDI:CategoryService }}
       * @memberof GetCategoryOptionsTypeQuery
       */
    constructor({ logFileInfrastructureDI, chatGPTServiceDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });
        this.chatGPTServiceDI = chatGPTServiceDI;
    };
    init(dto) {
        this.model = dto;
    }

    async action() {
        let result = await this.chatGPTServiceDI.setContext(this.context).generateCMSElement({ prompt: this.model.prompt });
        return result;
    }
};

export const GenerateCmsElementByChatGPTQueryPlugin = {
    pluginName: "generate-cms-element-by-chat-gpt-query",
    type: 'query',
    di: 'generateCmsElementByChatGPTQuery',
    classType: GenerateCmsElementByChatGPTQuery
}
