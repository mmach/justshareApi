'use strict';

import { ProjectDTO } from "../project";
import { RolesProjectDTO } from "../roles";
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
