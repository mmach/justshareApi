// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { PrivilegesProjectDTO } from "justshare-shared";
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
export default class DeletePrivilegesProjectCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, privilegeProjectServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI,
             authInfrastructureDI,
              projectInfrastructureDI });
        this.privilegeProjectServiceDI = privilegeProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new PrivilegesProjectDTO(), dto);
    }
    async action() {
        await this.privilegeProjectServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });

    }
};
