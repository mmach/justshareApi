"use strict";

import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {CategoryDTO} from 'justshare-shared';
import CategoryService from '../../Services/Categories/categoryService.js';


export default class GetCategoriesAllQuery extends BaseQuery {
  /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryServiceDI:CategoryService }}
     * @memberof GetCategoryFreetextQuery
     */
    constructor({ logFileInfrastructureDI, categoryServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI,projectInfrastructureDI });
        this.categoryServiceDI = categoryServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
  
    async action() {
        let result = await this.categoryServiceDI.setContext(this.context).getAllCategoriesFlat({ model: this.model });
        //return this.list_to_tree(result)
        return result;
    }
};
