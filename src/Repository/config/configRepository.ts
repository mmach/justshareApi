import { IBaseRepositoryType } from "../../Architecture";
import { ConfigDBO } from "../../DBO/config";
import { Config } from "../../Domain/config";

export interface IConfigRepository extends IBaseRepositoryType<ConfigDBO, Config> {
  getByName({ type, lang, transaction }: { type: string; lang?: string; transaction?: number }): Promise<Config | null>;
  getByNames({ types, lang, transaction }: { types: string[]; lang?: string; transaction?: number }): Promise<Config[]>;
}

