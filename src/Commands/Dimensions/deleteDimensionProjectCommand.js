// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { DimensionsProjectDTO } from "justshare-shared";
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
export default class DeleteDimensionProjectCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, dimensionsProjectServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI,
          //   authInfrastructureDI,
              projectInfrastructureDI });
        this.dimensionsProjectServiceDI = dimensionsProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new DimensionsProjectDTO(), dto);
    }
    async action() {
        await this.dimensionsProjectServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });

    }
};
