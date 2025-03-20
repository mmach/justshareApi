// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {DimensionsProjectDTO} from "justshare-shared";
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
export default class UpsertDimensionProjectCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, dimensionsProjectServiceDI,translationServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI,
           //  authInfrastructureDI,
              projectInfrastructureDI });
        this.dimensionsProjectServiceDI = dimensionsProjectServiceDI
        this.translationServiceDI = translationServiceDI

    };
    init(dto) {
        this.model = Object.assign(new DimensionsProjectDTO(), dto);
    }
    async action() {
        if (this.model.translation_id) {
            await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
        }
       // await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
       // this.model.translation_id = this.model.translation.id;
        await this.dimensionsProjectServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });

    }
};
