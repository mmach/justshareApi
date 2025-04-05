'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Status attributes
 */
export interface StatusDBO extends BaseDBO{
  id: string;
  token?: string;
  project_id?: string;
}
