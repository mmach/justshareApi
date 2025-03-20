import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import { SeoDTO } from 'justshare-shared';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import {AuthInfrastucture}from '../../Architecture/Infrastructure/authInfrastucture.js';
import mjml2html from 'mjml'
import json2xml from "json2xml";






export default class UpsertStatusGlobalCommand extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, statusProjectServiceDI }) {
        super({ logFileInfrastructureDI});
        this.statusProjectServiceDI = statusProjectServiceDI;
    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {

        console.log(this.model)
        await this.statusProjectServiceDI.setContext(this.context).upsertGlobal({ model: this.model, withProject: true })
    }
};
