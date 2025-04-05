import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { UserConversationDBO } from "../user";
import { ConversationMessagesDBO } from "./conversationMessages";

/**
 * Interface for Conversation attributes
 */
export interface ConversationDBO extends BaseDBO {
  id: string;
  user_owner_id?: string;
  title?: string;
  iua_id?: string;
  status?: string;
  project_id?: string;
  
  users?: UserConversationDBO[];
  messages?: ConversationMessagesDBO[];
  user_filter?: UserConversationDBO[];
}
