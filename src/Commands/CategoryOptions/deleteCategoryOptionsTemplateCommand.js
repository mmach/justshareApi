// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import CategoryOptionService from "../../Services/category/implementations/categoryOptionService.js";
import { CategoryOptionsTemplateDTO } from 'justshare-shared'
"use strict";




/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class DeleteCategoryOptionsTemplateCommand extends BaseCommand {
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
        this.model = Object.assign(new CategoryOptionsTemplateDTO(), dto);
    }
    async action() {
       
        await this.categoryOptionServiceDI.setContext(this.context).deleteTemplate({ model: this.model });

    }
};
