'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { StatusProjectsDBO } from "./statusProjects";

/**
 * Interface for StatusActions attributes
 */
export interface StatusActionsDBO extends BaseDBO{
  id: string;
  status_id?: string;
  action_id?: string;

  status?: StatusProjectsDBO;
}
