// @ts-nocheck

import {BaseService} from "../Architecture/Base/baseService";
import UnitOfWork from "../unitOfWork";

import CONFIG from "../config.js";
import {CountryDTO} from "justshare-shared";


/**
 *
 * @export
 * @class UserService
 * @extends BaseService
 */
export default class CountryService extends BaseService {
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
   * @param   {{ country: CountryDTO}}
   * @returns
   * @memberof CountryService
   */
  async getCountryByName({country}) {

    let countryList = await this.unitOfWorkDI.countryRepository.getCountryByName({
      name_fs: country.name
    });
    return countryList;
  }
}
