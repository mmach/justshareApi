'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Roles attributes
 */
export interface RolesDBO extends BaseDBO{
  id: string;
  name?: string;
  status?: boolean;
  description?: string;
  project_id?: string;
}
