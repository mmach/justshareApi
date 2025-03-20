// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { CategoryDTO } from "justshare-shared";
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
export default class InsertCategoryCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,blobServiceDI:BlobService,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, translationServiceDI, categoryServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, blobServiceDI,
        projectInfrastructureDI }) {
        super({
            logFileInfrastructureDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI
        });
        this.categoryServiceDI = categoryServiceDI
        this.blobServiceDI = blobServiceDI;
        this.translationServiceDI = translationServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
    async action() {
        console.log(this.model);
        await this.translationServiceDI.setContext(this.context).insert({ model: this.model.translation, withProject: true });
        this.model.translation_id = this.model.translation.id
        await this.categoryServiceDI.setContext(this.context).newCategory({ model: this.model });
        if (this.model.blob) {


            await this.blobServiceDI.setContext(this.context).uploadCategoriesIconAndSave({ category_id: this.model.id, blob: this.model.blob })
        }
    }
};
