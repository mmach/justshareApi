import { IBaseRepositoryType } from "../../Architecture/index.js";
import { CountryDBO } from "../../DBO";
import { Country } from "../../Domain/index.js";


export interface ICountryRepository extends IBaseRepositoryType<CountryDBO, Country> {
  getCountryByName({
    name_fs,
    transaction
  }: {
    name_fs: string;
    transaction?: number;
  }): Promise<object[]>;
}
