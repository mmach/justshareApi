'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { PrivilegesDBO } from "./privileges";

/**
 * Interface for PrivilegesProject attributes
 */
export interface PrivilegesProjectDBO extends BaseDBO{
  id: string;
  privilege_id?: string;
  project_id?: string;
  status?: boolean;

  privilege_details?: PrivilegesDBO;

}
