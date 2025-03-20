"use strict";

import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import { CategoryDTO } from 'justshare-shared';
import CategoryService from '../../Services/Categories/categoryService.js';
import CategoryOptionService from '../../Services/Categories/categoryOptionService.js';




export default class GetCategoryOptionsQuery extends BaseQuery {
    /**
       * Creates an instance of GetDictionariesQuery.
       * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryOptionServiceDI:CategoryOptionService,categoryServiceDI:CategoryService }}
       * @memberof GetCategoryOptionsTypeQuery
       */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI, categoryServiceDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI;
        this.categoryServiceDI = categoryServiceDI
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }

    async action() {
        let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: this.model.id })
        let ids = categories.map(item => { return item.id });
        let result = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
        return result;
    }
};
