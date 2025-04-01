'use strict';

import { ProcessChainPrivilegeDTO } from "./processChainPrivilege";

/**
 * Interface for ProcessChainActionInjection attributes
 */
export interface ProcessChainActionInjectionDTO {
  id: string;
  process_chain_id?: string;
  action_id?: string;
  project_id?: string;
  action_type?: string;
  action_group?: string;
  func?: string;
  sort_order?: string;
  show_on_current?: boolean;
  show_on_next?: boolean;
  external_process_id?: string;
  external_process_chain_id?: string;
  ref_key?: string;
  on_before_hook?: boolean;
  on_after_hook?: boolean;

  action_privileges?: ProcessChainPrivilegeDTO[];

}
