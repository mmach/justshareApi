'use strict';

import { ProcessChainDTO } from "./processChain";

/**
 * Interface for Process attributes
 */
export interface ProcessDTO {
  id: string;
  token?: string;
  project_id?: string;

  process_chain?: ProcessChainDTO[];

}
