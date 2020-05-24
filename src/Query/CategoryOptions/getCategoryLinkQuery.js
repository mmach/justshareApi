"use strict";

import BaseQuery from '../../Architecture/baseQuery.js';
import { CategoryDTO } from 'justshare-shared';
import CategoryOptionService from '../../Services/categoryOptionService.js';




export default class GetCategoryLinkQuery extends BaseQuery {
    /**
       * Creates an instance of GetDictionariesQuery.
       * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryOptionServiceDI:CategoryOptionService }}
       * @memberof GetCategoryOptionsTypeQuery
       */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }

    async action() {
        let result = await this.categoryOptionServiceDI.setContext(this.context).getCategoryLinkQuery({ id: this.model.id });
        //return this.list_to_tree(result)
        return result;
    }
};
