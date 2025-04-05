import { BaseDBO } from "../../Architecture";
import { ConversationDBO, vUserDBO, ItemDBO, ActionPrivilegesDBO } from "../../DBO";


/**
 * Interface for ItemUserAction attributes
 */
export interface ItemUserActionDBO extends BaseDBO {
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

  conversation?: ConversationDBO;
  users?: vUserDBO;
  item?: ItemDBO;
  action_privileges?: ActionPrivilegesDBO[];
}

