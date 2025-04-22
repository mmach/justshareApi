import { ICityRepository } from "./cityRepository";
import { ICountryRepository } from "./countryRepository";

export type LOCATION_REPOSITORY = {
  cityRepositoryDI: ICityRepository;
  countryRepositoryDI: ICountryRepository;
};