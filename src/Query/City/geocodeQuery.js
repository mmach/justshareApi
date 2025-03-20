import {BaseQuery} from '../../Architecture/Base/baseQuery.js';
import CityService from '../../Services/cityService.js';
import {ReverseGeoDTO} from 'justshare-shared'
import CountryService from '../../Services/countryService.js';

export default class GeocodeQuery extends BaseQuery {

    /**
 * Creates an instance of GetDictionariesQuery.
  * @param  {{ logFileInfrastructureDI:LogFileInfrastructure, cityServiceDI:CityService ,countryServiceDI:CountryService ,authInfrastructureDI:AuthInfrastucture}}
  * @memberof GetCountriesQuery
  */
    constructor({ logFileInfrastructureDI, cityServiceDI, authInfrastructureDI, countryServiceDI,projectInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI,projectInfrastructureDI });
        this.cityServiceDI = cityServiceDI;
        this.countryServiceDI = countryServiceDI

    };
    init(dto) {
        this.model = Object.assign(new ReverseGeoDTO(), dto);;
    }

    async action() {
        let reverseResult = await this.cityServiceDI.setContext(this.context).getReverseByLatLng({ latitude: this.model.latitude, longitude: this.model.longitude });
        console.log(reverseResult)
        if (reverseResult.address ) {
            try{
                let country_result = await this.countryServiceDI.setContext(this.context).getCountryByName({ country: { name: reverseResult.address.country } })
                let city_result = await this.cityServiceDI.setContext(this.context).getCities({ city: { country_id: country_result[0].id, name: reverseResult.address.city } })
                let city = city_result && city_result.filter(item => { return item.name == reverseResult.address.city || item.name_clear == reverseResult.address.city });
                if (city && city.length == 0) {
                    city = city_result.filter(item => { return item.name_clob.includes(reverseResult.address.city) });

                }
                reverseResult.address.country_id = country_result[0].id

                if (city.length > 0) {
                    reverseResult.address.city_id = city[0].id;
                    reverseResult.address.country_id = country_result[0].id

                }
            }
            catch(err)
            {
                console.log(err)
            }
        }

        return reverseResult;


    }
};
