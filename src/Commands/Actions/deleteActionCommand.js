// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {ActionsDTO} from "justshare-shared";
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
export default class DeleteActionCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, actionServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI,
            dbTransactionInfrastuctureDI,
            authInfrastructureDI,
            projectInfrastructureDI
        });
        this.actionServiceDI = actionServiceDI

    };
    init(dto) {
        this.model = Object.assign(new ActionsDTO(), dto);
    }
    async action() {
        await this.actionServiceDI.setContext(this.context).delete({ model: this.model, withProject: true })
        // await this.categoryServiceDI.setContext(this.context).removeCategory({ id:this.model.id });

    }
};
