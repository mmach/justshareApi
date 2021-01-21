// @ts-nocheck

import BaseService from "../Architecture/baseService.js";
import UnitOfWork from "../unitOfWork.js";

import CONFIG from "../config.js";
import {CityDTO} from "justshare-shared";
import NodeGeocoder from 'node-geocoder';
import axios from 'axios'
var options = {
  provider: 'locationiq',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: CONFIG.LOCATION_IQ, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

/**
 *
 * @export
 * @class CityService
 * @extends BaseService
 */
export default class CityService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'countryRepository' });
  }


  /**
   *
   *
   * @param   {{ city: CityDTO}}
   * @returns {{Promise<CityDTO[]>}}
   * @memberof CityService
   */
  async getCities({ city }) {

  
    let cityList = await this.unitOfWorkDI.cityRepository.getCities({
      name_fs: city.name,
      country_id: city.country_id
    });
    return cityList;
  }

  /**
   *
   *
   * @param   {{ city: CityDTO}}
   * @returns {{Promise<CityDTO[]>}}
   * @memberof CityService
   */
  async getReverse({ country_code, city, address }) {

    var geocoder = NodeGeocoder(options);
    // Using callback
    console.log(country_code)
    let result = await new Promise((resolve, rej) => {
     axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=${ CONFIG.LOCATION_IQ}&format=json&q=${encodeURI(address)}&countrycodes=${country_code}&limit=5&normalizeaddress=1`).then(succ=>{

      resolve(succ.data);


     })
     // geocoder.geocode({ q: address, country: country, city: city, limit: 5,"accept-language":this.context.language }, function (err, res) {
     //   console.log(res)
//
     //   resolve(res);
    //  });

    });
    return result;
  }

  async getReverseByLatLng({ longitude, latitude, address }) {

    var geocoder = NodeGeocoder(options);

    let result = await new Promise((resolve, rej) => {

      axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${ CONFIG.LOCATION_IQ}&format=json&lat=${latitude}8&lon=${longitude}&normalizeaddress=1`).then(succ=>{
        resolve(succ.data);
      });
/*
      geocoder.reverse({ lat: latitude, lon: longitude,"accept-language":this.context.language }, function (err, res) {

        console.log(res)
        resolve(res);
      });
*/
    });
    return result;
  }
}
