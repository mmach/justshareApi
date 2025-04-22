// @ts-nocheck

import {BaseService} from "../Architecture/Base/baseService";
import UnitOfWork from "../unitOfWork";

import CONFIG from "../config.js";
import { CityDTO } from "justshare-shared";
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
  async getReverse({ country_code, city, address, tag }) {

    // Using callback
    try {
      let result = await new Promise((resolve, rej) => {
        axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=${CONFIG.LOCATION_IQ}&format=json&q=${encodeURI(address)}${tag ? `&tag=${tag}` : ''}&dedupe=1&accept-language=${this.context.language}&countrycodes=${country_code}&limit=5&normalizeaddress=1`).then(succ => {
          resolve(succ.data);
        })
        // geocoder.geocode({ q: address, country: country, city: city, limit: 5,"accept-language":this.context.language }, function (err, res) {
        //   console.log(res)
        //
        //   resolve(res);
        //  });

      });

      return result;
    } catch (er) {
      return []
    }
  }

  async getReverseByLatLng({ longitude, latitude, address }) {

    try {
      let result = await new Promise((resolve, rej) => {

        axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${CONFIG.LOCATION_IQ}&format=json&lat=${latitude}8&lon=${longitude}&normalizeaddress=1`).then(succ => {
          resolve(succ.data);
        });
        /*
              geocoder.reverse({ lat: latitude, lon: longitude,"accept-language":this.context.language }, function (err, res) {
        
                resolve(res);
              });
        */
      });
      return result;
    } catch (er) {
      return []
    }
  }
}
