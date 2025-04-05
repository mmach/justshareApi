'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { PrivilegesDBO } from "../privileges";

/**
 * Interface for ProcessChainPrivilege attributes
 */
export interface ProcessChainPrivilegeDBO extends BaseDBO{
  id: string;
  process_chain_action_id?: string;
  process_chain_id?: string;
  privilege_id?: string;
  project_id?: string;

  privilege_details?: PrivilegesDBO;

}
