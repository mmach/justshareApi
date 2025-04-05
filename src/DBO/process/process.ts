'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { ProcessChainDBO } from "./processChain";

/**
 * Interface for Process attributes
 */
export interface ProcessDBO extends BaseDBO{
  id: string;
  token?: string;
  project_id?: string;

  process_chain?: ProcessChainDBO[];

}
