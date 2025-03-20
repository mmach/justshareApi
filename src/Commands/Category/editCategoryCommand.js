// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { CategoryDTO } from "justshare-shared";
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
export default class EditCategoryCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, translationServiceDI, categoryServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI, blobServiceDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI });
        this.categoryServiceDI = categoryServiceDI;
        this.blobServiceDI = blobServiceDI;
        this.translationServiceDI = translationServiceDI

    };
    init(dto) {
        this.model = { ...dto };
    }
    async action() {
        console.log(this.model)
        await this.categoryServiceDI.setContext(this.context).update({ model: this.model, withProject: true });
        if (this.model.translation) {
            await this.translationServiceDI.setContext(this.context).update({ model: this.model.translation, withProject: true });
        }

        if (this.model.blob) {


            await this.blobServiceDI.setContext(this.context).uploadCategoriesIconAndSave({ category_id: this.model.id, blob: this.model.blob })
        }
    }
};
