import { BaseDBO } from "../../Architecture/Base/baseDBO";

/**
 * Interface for Config attributes
 */
export interface ConfigDBO extends BaseDBO {
  id: string;
  project_id?: string;
  type?: string;
  lang?: string;
  body?: string;
}
