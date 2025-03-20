import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import { SeoDTO } from 'justshare-shared';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import {AuthInfrastucture}from '../../Architecture/Infrastructure/authInfrastucture.js';
import mjml2html from 'mjml'
import json2xml from "json2xml";






export default class RemoveStatusCommand extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI, projectInfrastructureDI, statusProjectServiceDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI ,authInfrastructureDI});
        this.statusProjectServiceDI = statusProjectServiceDI;
    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {

        this.statusProjectServiceDI.setContext(this.context).delete({ model: this.model,withProject:true })
    }
};
