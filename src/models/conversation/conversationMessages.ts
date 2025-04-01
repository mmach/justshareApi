import { vUserDTO } from "../user";
import { ConversationMessageMembersDTO } from "./conversationMessagesMembers";

/**
 * Interface for ConversationMessages attributes
 */
export interface ConversationMessagesDTO {
  id: string;
  user_id?: string;
  message_triggered_id?: string;
  conversation_id?: string;
  message?: string;
  project_id?: string;
  is_newest?: boolean;

  user_detail?: vUserDTO;
  users?: ConversationMessageMembersDTO[];
}
