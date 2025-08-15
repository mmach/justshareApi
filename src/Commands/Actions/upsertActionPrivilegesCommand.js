// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { ActionPrivilegesDTO } from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/category/implementations/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class UpsertActionPrivilegesCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, actionPrivilegesServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI,
            dbTransactionInfrastuctureDI,
            //     authInfrastructureDI,
            projectInfrastructureDI
        });
        this.actionPrivilegesServiceDI = actionPrivilegesServiceDI

    };
    init(dto) {
        this.model = Object.assign(new ActionPrivilegesDTO(), dto);
    }
    async action() {
        await this.actionPrivilegesServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true })
        // await this.categoryServiceDI.setContext(this.context).removeCategory({ id:this.model.id });

    }
};
