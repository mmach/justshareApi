import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import {AuthInfrastucture}from '../../Architecture/Infrastructure/authInfrastucture.js';
import {LogFileInfrastructure} from '../../Architecture/Infrastructure/logFileInfrastructure.js';
import CONFIG from "../../config.js";
import UserService from '../../Services/userService.js';






export default class TranslateQuery extends BaseQuery {
    /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,  dictionaryDI,userServiceDI:UserService,authInfrastructureDI:AuthInfrastucture }}
     * @memberof UserLogInInternalQuery
     */
    constructor({ logFileInfrastructureDI, userServiceDI, authInfrastructureDI, projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI, projectInfrastructureDI });

    };
    init(dto) {
        this.model = { ...dto };;
    }

    async action() {

        try{
        let lang = this.model.text;
        let langFrom = this.model.fromLang
        if (langFrom == 'zh_cn') {
            langFrom = 'zh';
        } else if (langFrom == 'us') {
            langFrom = 'en';
        }
        console.log('TESTTT')
        console.log(CONFIG.TRANSLATE.engine);
        console.log(CONFIG.TRANSLATE.key)
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
    catch(er)
    {
        console.log(er);
    }




    }
};
