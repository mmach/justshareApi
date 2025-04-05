"use strict";

import { BaseDBO } from "../../Architecture/Base/baseDBO";

/**
 * Interface for City attributes
 */
export interface CityDBO extends BaseDBO{
  id: string;
  name?: string;
  status?: string;
  country_id?: string;
  uid?: string;
  name_clob?: string;
  name_clear?: string;
  longitude?: number;
  latitude?: number;
  population?: number;
}
