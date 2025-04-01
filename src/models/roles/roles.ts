'use strict';


/**
 * Interface for Roles attributes
 */
export interface RolesDTO {
  id: string;
  name?: string;
  status?: boolean;
  description?: string;
  project_id?: string;
}
