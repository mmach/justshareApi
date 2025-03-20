import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import { DictionaryDTO } from 'justshare-shared';
import {CodeDictionary} from '../../Architecture/Dictionary/codeDictionary.js';


export default class GetDictionariesQuery extends BaseQuery {

    constructor({ logFileInfrastructureDI, projectInfrastructureDI,translationServiceDI }) {
        super({
            logFileInfrastructureDI, projectInfrastructureDI

        });
        this.translationServiceDI = translationServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new DictionaryDTO(), dto);;
    }

    async action() {

        return await  this.translationServiceDI.setContext(this.context).getTokens({})
        //let result = {};

        //result = new CodeDictionary().get('', '');
        
    }
};
