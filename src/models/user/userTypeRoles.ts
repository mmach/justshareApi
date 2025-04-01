'use strict';

import { ProjectDTO } from "../project/project";
import { RolesProjectDTO } from "../roles/rolesProject";
import { UserTypesDTO } from "./userTypes";

/**
 * Interface for UserTypeRoles attributes
 */
export interface UserTypeRolesDTO {
  id: string;
  usertype_id?: string;
  project_id?: string;
  role_id?: string;
  name?: string;

  type?: UserTypesDTO;
  project?: ProjectDTO;
  roles?: RolesProjectDTO;
}
