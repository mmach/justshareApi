import BaseQuery from '../../Architecture/baseQuery.js';
import { UserDTO } from 'justshare-shared';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import AuthInfrastucture from '../../Architecture/Infrastructure/authInfrastucture.js';
import mjml2html from 'mjml'
import json2xml from "json2xml";






export default class GetSeoQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI, projectInfrastructureDI, seoServiceDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI  });
        this.seoServiceDI = seoServiceDI;
    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {

       return this.seoServiceDI.setContext(this.context).getByProject({})
    }
};
