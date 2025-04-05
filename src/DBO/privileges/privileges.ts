'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Privileges attributes
 */
export interface PrivilegesDBO extends BaseDBO{
  id: string;
  name?: string;
  status?: boolean;
  project_id?: string;
}
