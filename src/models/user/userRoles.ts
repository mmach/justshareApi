'use strict';

import { ProjectDTO } from "../project";
import { RolesProjectDTO } from "../roles";

/**
 * Interface for UserRoles attributes
 */
export interface UserRolesDTO {
  id: string;
  user_id?: string;
  project_id?: string;
  role_id?: string;
  name?: string;

  project?: ProjectDTO;
  roles?: RolesProjectDTO;
}
