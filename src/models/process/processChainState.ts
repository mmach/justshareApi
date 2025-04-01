'use strict';


/**
 * Interface for ProcessChainState attributes
 */
export interface ProcessChainStateDTO {
  id: string;
  next_process_chain_id?: string;
  process_chain_id?: string;
  project_id?: string;
  process_id?: string;
  is_accept?: boolean;
}
