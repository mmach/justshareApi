// @ts-nocheck
import BaseCommand from "../../Architecture/baseCommand.js";
import { LanguageProjectDTO } from "justshare-shared";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/categoryService.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class DeleteLanguageFromProjectCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, languageProjectServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI, 
            //authInfrastructureDI,
             projectInfrastructureDI });
        this.languageProjectServiceDI = languageProjectServiceDI

    };
    init(dto) {
        this.model = Object.assign(new LanguageProjectDTO(), dto);
    }
    async action() {
        await this.languageProjectServiceDI.setContext(this.context).delete({ model: this.model, withProject: true });

    }
};
