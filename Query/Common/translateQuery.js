import BaseQuery from '../../Architecture/baseQuery.js';
import { UserDTO } from 'justshare-shared';
import LogFileInfrastructure from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import UserService from '../../Services/userService.js';
import AuthInfrastucture from '../../Architecture/Infrastructure/authInfrastucture.js';
import CONFIG from "../../config.js";






export default class TranslateQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });

    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {

        let lang = this.model.text;
        let langFrom = this.model.fromLang
        if (langFrom == 'zh_cn') {
            langFrom = 'zh';
        } else if (langFrom == 'us') {
            langFrom = 'en';
        }
        let text = await translate(this.model.text, {
            engine: CONFIG.TRANSLATE.engine, key: CONFIG.TRANSLATE.key, from: langFrom, to: this.model.toLang
        });


        if (lang == 'zh') {
            lang = 'zh_cn';
        } else if (lang == 'en') {
            lang = 'us';
        }
        return text;




    }
};
