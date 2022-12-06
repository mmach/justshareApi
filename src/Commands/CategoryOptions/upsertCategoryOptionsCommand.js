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
    constructor({ logFileInfrastructureDI, translationServiceDI, categoryOptionServiceDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI
        this.translationServiceDI = translationServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryOptionsDTO(), dto);
    }
    async action() {
        if (this.model.translation_id) {
            await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
        }
        await this.categoryOptionServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });
        //await this.categoryOptionServiceDI.setContext(this.context).upsertToCategory({model:this.model.category_link})
    }
};
