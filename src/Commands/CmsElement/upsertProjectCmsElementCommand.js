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
export default class UpsertProjectCmsElementCommand extends BaseCommand {
    /**
     * Creates an instance of upsertConfigCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, projectInfrastructureDI, cmsElementsProjectServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.cmsElementsProjectServiceDI = cmsElementsProjectServiceDI

    };
    init(dto) {
        this.model = dto;
    }
    async action() {
        await this.cmsElementsProjectServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });

    }
};
