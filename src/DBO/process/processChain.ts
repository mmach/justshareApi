'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { ProcessChainActionInjectionDBO } from "./processChainActionInjection";
import { ProcessChainStateDBO } from "./processChainState";

/**
 * Interface for ProcessChain attributes
 */
export interface ProcessChainDBO extends BaseDBO{
  id: string;
  status_id?: string;
  action_id?: string;
  project_id?: string;
  process_id?: string;
  is_reminder?: boolean;
  in_days?: number;
  x?: number;
  y?: number;
  autorun?: boolean;
  is_start?: boolean;
  is_last?: boolean;
  has_reminder?: boolean;
  change_status?: boolean;
  use_es?: boolean;
  params?: string;
  reminder_cron?: string;
  invoke_only?: boolean;
  is_condition?: boolean;
  is_autoclose_state?: boolean;

  process_chain_state?: ProcessChainStateDBO[];
  process_chain_actions?: ProcessChainActionInjectionDBO[];
}
