"use strict";

import BaseQuery from '../../Architecture/baseQuery.js';
import {CategoryActionsDTO} from 'justshare-shared';
import CategoryService from '../../Services/categoryService.js';


export default class GetCategoryActionsQuery extends BaseQuery {
  /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryServiceDI:CategoryService }}
     * @memberof GetCategoryFreetextQuery
     */
    constructor({ logFileInfrastructureDI, categoryServiceDI, dbTransactionInfrastuctureDI,
        projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI, dbTransactionInfrastuctureDI,  projectInfrastructureDI
        });
        this.categoryServiceDI = categoryServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryActionsDTO(), dto);
    }
    async action() {
        console.log(this.model)
        return await this.categoryServiceDI.setContext(this.context).getCategoryActions({ category_id: this.model.category_id });
      
    }
};
