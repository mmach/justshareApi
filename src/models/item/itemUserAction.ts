'use strict';

import { ActionPrivilegesDTO } from "../actions";
import { ConversationDTO } from "../conversation/conversation";
import { vUserDTO } from "../user/v_user";
import { ItemDTO } from "./item";

/**
 * Interface for ItemUserAction attributes
 */
export interface ItemUserActionDTO {
  id: string;
  item_id?: string;
  project_id?: string;
  user_id?: string;
  action_id?: string;
  comment?: string;
  rating?: number;
  status?: string;
  iua_id?: string;
  iua_prev_id?: string;
  status_id?: string;
  uniq_number?: string;
  created_date?: Date;
  process_id?: string;
  process_chain_id?: string;
  parent_process_id?: string;
  parent_process_chain_id?: string;
  parent_iua_id?: string;
  destination_date?: Date;

  conversation?: ConversationDTO;
  users?: vUserDTO;
  item?: ItemDTO;
  action_privileges?: ActionPrivilegesDTO[];
}

