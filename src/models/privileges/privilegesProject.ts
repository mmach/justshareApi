'use strict';

import { PrivilegesDTO } from "./privileges";

/**
 * Interface for PrivilegesProject attributes
 */
export interface PrivilegesProjectDTO {
  id: string;
  privilege_id?: string;
  project_id?: string;
  status?: boolean;

  privilege_details?: PrivilegesDTO;

}
