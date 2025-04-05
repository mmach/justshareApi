'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { ProjectDBO } from "../project";
import { RolesProjectDBO } from "../roles";

/**
 * Interface for UserRoles attributes
 */
export interface UserRolesDBO extends BaseDBO{
  id: string;
  user_id?: string;
  project_id?: string;
  role_id?: string;
  name?: string;

  project?: ProjectDBO;
  roles?: RolesProjectDBO;
}
