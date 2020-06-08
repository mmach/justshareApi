import BaseQuery from '../../Architecture/baseQuery.js';
import { UserDTO } from 'justshare-shared';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import AuthInfrastucture from '../../Architecture/Infrastructure/authInfrastucture.js';
import mjml2html from 'mjml'
import json2xml from "json2xml";





export default class MjmlCompileQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI, projectInfrastructureDI, mailSenderDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI, mailSenderDI });
        this.mailSenderDI = mailSenderDI;
    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {

        console.log(this.model)
        if (this.model.mailBody) {
            let body = await this.mailSenderDI.xsltToHtml({ xslt: this.model.mailBody, xml: json2xml(this.model.payloadBodyXml) });
            this.model.templateXml = this.model.templateXml.replace('#body#', body)
        }

        console.log(json2xml(this.model.payloadTemplateXml))
        let bodyMail = await this.mailSenderDI.xsltToHtml({ xslt: this.model.templateXml, xml: json2xml(this.model.payloadTemplateXml) });
        console.log(bodyMail)
        const htmlOutput = mjml2html(bodyMail, { minify: true })
        return htmlOutput
    }
};
