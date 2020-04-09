"use strict";

import BaseQuery from '../../Architecture/baseQuery.js';
import {CategoryDTO} from 'justshare-shared';


export default class GetCategoryQuery extends BaseQuery {

    constructor({ logFileInfrastructureDI, categoryServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI,projectInfrastructureDI });
        this.categoryServiceDI = categoryServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
    async action() {
        return await this.categoryServiceDI.setContext(this.context).getById({ id: this.model.id })

    }
};
