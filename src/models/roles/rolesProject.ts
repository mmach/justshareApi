'use strict';

import { ProjectDTO } from "../project";
import { RolesDTO } from "./roles";

/**
 * Interface for RolesProject attributes
 */
export interface RolesProjectDTO {
  id: string;
  role_id?: string;
  project_id?: string;

  project?: ProjectDTO;
  role_detail?: RolesDTO;
}
