// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { ConfigDTO } from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class upsertConfigCommand
 * @extends BaseCommand
 */
export default class DeleteProjectCmsMenuCommand extends BaseCommand {
    /**
     * Creates an instance of upsertConfigCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, projectInfrastructureDI, cmsMenuProjectServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.cmsMenuProjectServiceDI = cmsMenuProjectServiceDI

    };
    init(dto) {
        this.model = dto;
    }
    async action() {
        await this.cmsMenuProjectServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });

    }
};
