'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { ProjectDBO } from "../project";
import { RolesDBO } from "./roles";

/**
 * Interface for RolesProject attributes
 */
export interface RolesProjectDBO extends BaseDBO{
  id: string;
  role_id?: string;
  project_id?: string;

  project?: ProjectDBO;
  role_detail?: RolesDBO;
}
