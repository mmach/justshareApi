// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {DimensionsDTO} from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class DeleteDimensionCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, dimensionsServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI,projectInfrastructureDI,dimensionsProjectServiceDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI,
             authInfrastructureDI,
             projectInfrastructureDI });
             this.dimensionsServiceDI = dimensionsServiceDI;
             this.dimensionsProjectServiceDI = dimensionsProjectServiceDI


    };
    init(dto) {
        this.model = Object.assign(new DimensionsDTO(), dto);
    }
    async action() {
        
       await this.dimensionsServiceDI.setContext(this.context).delete({ model:this.model,withProject:true });

    }
};
