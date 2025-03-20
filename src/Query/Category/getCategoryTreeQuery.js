"use strict";

import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import { CategoryDTO } from 'justshare-shared';


export default class GetCategoryTreeQuery extends BaseQuery {

    constructor({ logFileInfrastructureDI, categoryServiceDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI });

        this.categoryServiceDI = categoryServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
    async action() {
        let result = await this.categoryServiceDI.setContext(this.context).getCategoryTree({ id: this.model.id, parent: this.model.parent })
        if (result.length == 0) {
            return await this.categoryServiceDI.setContext(this.context).getCategoryTree({ id: this.model.parent })
        } else {
            return result
        }

    }
};
