import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Country attributes
 */
export interface CountryDBO extends BaseDBO{
  id: string;
  name?: string;
  status?: string;
  uid?: string;
  name_clob?: string;
  name_clear?: string;
  longitude?: number;
  latitude?: number;
}
