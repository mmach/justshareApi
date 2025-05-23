// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import CategoryOptionService from "../../Services/Categories/categoryOptionService.js";
import {CategoryOptionsLinkDTO} from 'justshare-shared'
"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class DeleteCategoryOptionsLinkCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryOptionServiceDI:CategoryOptionService ,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI, authInfrastructureDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI,projectInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryOptionsLinkDTO(), dto);
    }
    async action() {
        console.log(this.model);
        await this.categoryOptionServiceDI.setContext(this.context).removeCategoryOptionsForCategory({ id: this.model.id });

    }
};
