'use strict';

import { StatusProjectsDTO } from "./statusProjects";

/**
 * Interface for StatusActions attributes
 */
export interface StatusActionsDTO {
  id: string;
  status_id?: string;
  action_id?: string;

  status?: StatusProjectsDTO;
}
