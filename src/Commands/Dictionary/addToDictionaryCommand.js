import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { DictionaryDTO } from "justshare-shared";

"use strict";


export default class AddToDictionaryCommand extends BaseCommand {

    constructor({ logFileInfrastructureDI, dictionaryDI, authInfrastructureDI, projectInfrastructureDI, translationServiceDI }) {
        // @ts-ignore
        super({ logFileInfrastructureDI, dictionaryDI, projectInfrastructureDI, authInfrastructureDI, translationServiceDI });
        this.translationServiceDI = translationServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new DictionaryDTO(), dto);
    }
    async action() {

        this.translationServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true })
        //this.dictionaryDI.set(this.model.code, this.model.type, this.model);
    }
};
