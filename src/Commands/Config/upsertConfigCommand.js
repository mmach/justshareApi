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
export default class UpsertConfigCommand extends BaseCommand {
    /**
     * Creates an instance of upsertConfigCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, projectInfrastructureDI, configServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });
        this.configServiceDI = configServiceDI

    };
    init(dto) {
        this.model = Object.assign(new ConfigDTO(), dto);
    }
    async action() {
        this.model.project_id = this.context.project.id
        this.model.body = this.model.body.startsWith('base64:') ? Buffer.from(this.model.body.replace('base64', ''), 'base64').toString('utf-8') : this.model.body

        console.log(this.model);
        await this.configServiceDI.setContext(this.context).upsert({ model: this.model });

    }
};
