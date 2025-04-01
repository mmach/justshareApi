import { UserConversationDTO } from "../user";
import { ConversationMessagesDTO } from "./conversationMessages";

/**
 * Interface for Conversation attributes
 */
export interface ConversationDTO {
  id: string;
  user_owner_id?: string;
  title?: string;
  iua_id?: string;
  status?: string;
  project_id?: string;
  
  users?: UserConversationDTO[];
  messages?: ConversationMessagesDTO[];
  user_filter?: UserConversationDTO[];
}
