'use strict';

import { ProjectDTO } from "../project/project";
import { RolesProjectDTO } from "../roles/rolesProject";

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
