// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { ConfigDTO } from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/category/implementations/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class upsertConfigCommand
 * @extends BaseCommand
 */
export default class UpsertProjectCmsPageCommand extends BaseCommand {
    /**
     * Creates an instance of upsertConfigCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, projectInfrastructureDI, cmsPageProjectServiceDI, authInfrastructureDI, translationServiceDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.cmsPageProjectServiceDI = cmsPageProjectServiceDI
        this.translationServiceDI = translationServiceDI

    };
    init(dto) {
        this.model = dto;
    }
    async action() {
        if (this.model.translation_id) {
            await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
        }
        await this.cmsPageProjectServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });

    }
};
