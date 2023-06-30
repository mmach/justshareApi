// @ts-nocheck
import BaseCommand from "../../Architecture/baseCommand.js";
import { ConfigDTO } from "justshare-shared";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/categoryService.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class upsertConfigCommand
 * @extends BaseCommand
 */
export default class UpsertProjectCmsMenuItemCommand extends BaseCommand {
    /**
     * Creates an instance of upsertConfigCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, projectInfrastructureDI, translationServiceDI, cmsMenuItemsProjectServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.cmsMenuItemsProjectServiceDI = cmsMenuItemsProjectServiceDI
        this.translationServiceDI = translationServiceDI


    };
    init(dto) {
        this.model = dto;
    }
    async action() {
        if (this.model.translation_id) {
            await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
        }
        console.log(this.model)
        await this.cmsMenuItemsProjectServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });

    }
};
