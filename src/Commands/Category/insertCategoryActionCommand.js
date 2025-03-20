// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { CategoryActionsDTO } from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import BlobService from "../../Services/Blobs/blobService.js";

"use strict";



/**
 * 
 * @export
 * @class InsertCategoryCommand
 * @extends BaseCommand
 */
export default class InsertCategoryActionCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,blobServiceDI:BlobService,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, categoryServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, blobServiceDI,
        projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI
        });
        this.categoryServiceDI = categoryServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryActionsDTO(), dto);
    }
    async action() {
        await this.categoryServiceDI.setContext(this.context).insertAction({ model: this.model });
      
    }
};
