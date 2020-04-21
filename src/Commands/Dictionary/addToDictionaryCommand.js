import BaseCommand from "../../Architecture/baseCommand.js";
import {DictionaryDTO} from "justshare-shared";

"use strict";


export default class AddToDictionaryCommand extends BaseCommand {

    constructor({ logFileInfrastructureDI ,dictionaryDI,authInfrastructureDI,projectInfrastructureDI}) {
        // @ts-ignore
        super({ logFileInfrastructureDI,dictionaryDI,authInfrastructureDI});
    };
    init(dto) {
        this.model = Object.assign(new DictionaryDTO(), dto);
    }
    async action() {

        this.dictionaryDI.set(this.model.code, this.model.type, this.model);
    }
};