'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { ProjectDBO } from "../project";
import { RolesProjectDBO } from "../roles";
import { UserTypesDBO } from "./userTypes";

/**
 * Interface for UserTypeRoles attributes
 */
export interface UserTypeRolesDBO extends BaseDBO{
  id: string;
  usertype_id?: string;
  project_id?: string;
  role_id?: string;
  name?: string;

  type?: UserTypesDBO;
  project?: ProjectDBO;
  roles?: RolesProjectDBO;
}
