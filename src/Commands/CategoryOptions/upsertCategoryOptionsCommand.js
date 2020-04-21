// @ts-nocheck
import BaseCommand from "../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import CategoryOptionService from "../../Services/categoryOptionService.js";
import { CategoryOptionsDTO } from 'justshare-shared'
"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class UpsertCategoryOptionsCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryOptionServiceDI:CategoryOptionService ,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryOptionsDTO(), dto);
    }
    async action() {

        await this.categoryOptionServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });
        //await this.categoryOptionServiceDI.setContext(this.context).upsertToCategory({model:this.model.category_link})
    }
};