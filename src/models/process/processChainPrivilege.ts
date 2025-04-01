'use strict';

import { PrivilegesDTO } from "../privileges";

/**
 * Interface for ProcessChainPrivilege attributes
 */
export interface ProcessChainPrivilegeDTO {
  id: string;
  process_chain_action_id?: string;
  process_chain_id?: string;
  privilege_id?: string;
  project_id?: string;

  privilege_details?: PrivilegesDTO;

}
