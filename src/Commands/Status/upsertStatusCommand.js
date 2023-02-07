import BaseQuery from '../../Architecture/baseQuery.js';
import { SeoDTO } from 'justshare-shared';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import AuthInfrastucture from '../../Architecture/Infrastructure/authInfrastucture.js';
import mjml2html from 'mjml'
import json2xml from "json2xml";






export default class UpsertStatusCommand extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI, projectInfrastructureDI, statusProjectServiceDI, translationServiceDI }) {
        super({ logFileInfrastructureDI, projectInfrastructureDI ,authInfrastructureDI});
        this.statusProjectServiceDI = statusProjectServiceDI;
        this.translationServiceDI = translationServiceDI
    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {
        if (this.model.translation_id) {
            await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
        }
        //await this.translationServiceDI.setContext(this.context).upsert({ model: this.model.translation, withProject: true });
        //this.model.translation_id = this.model.translation.id;
        return this.statusProjectServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true })
    }
};
