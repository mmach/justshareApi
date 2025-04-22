import { IBaseRepositoryType } from "../../Architecture";
import { CityDBO } from "../../DBO";
import { City } from "../../Domain";


export interface ICityRepository extends IBaseRepositoryType<CityDBO, City> {
  getCities({
    name_fs,
    country_id,
    transaction
  }: {
    name_fs: string;
    country_id: string;
    transaction?: number;
  }): Promise<object[]>;
}
