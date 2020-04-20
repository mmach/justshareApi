import BaseQuery from '../../Architecture/baseQuery.js';
import {CountryDTO} from 'justshare-shared'
import CountryService from '../../Services/countryService.js';



export default class GetCountriesByIdQuery extends BaseQuery {

    /**
  * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, countryServiceDI:CountryService }}
  * @memberof GetCountriesQuery
  */
    constructor({ logFileInfrastructureDI, countryServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI,projectInfrastructureDI });
        this.countryServiceDI=countryServiceDI;

    };
    init(dto) {
        this.model = Object.assign(new CountryDTO(), dto);;
    }

    async action() {
        return await this.countryServiceDI.setContext(this.context).getById({id:this.model.id});
    }
};
