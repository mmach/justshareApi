// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {CategoryDTO} from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class SetParentCategoryCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, categoryServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI, authInfrastructureDI,projectInfrastructureDI });
        this.categoryServiceDI = categoryServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
    async action() {
        await this.categoryServiceDI.setContext(this.context).setParent({ id: this.model.id, status: this.model.status, idParent: this.model.CategoryHierarchy.category_parent_id });

    }
};
