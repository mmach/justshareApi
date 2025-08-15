// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import CategoryOptionService from "../../Services/category/implementations/categoryOptionService.js";
import {CategoryOptionsDTO} from 'justshare-shared'
"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class DeleteCategoryOptionsForCategoryCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryOptionServiceDI:CategoryOptionService ,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI, authInfrastructureDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI,projectInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryOptionsDTO(), dto);
    }
    async action() {
       await this.categoryOptionServiceDI.setContext(this.context).removeCategoryOptionsForCategory({ id:this.model.id });

    }
};
