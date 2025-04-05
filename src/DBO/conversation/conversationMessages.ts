import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { vUserDBO } from "../user";
import { ConversationMessageMembersDBO } from "./conversationMessagesMembers";

/**
 * Interface for ConversationMessages attributes
 */
export interface ConversationMessagesDBO extends BaseDBO {
  id: string;
  user_id?: string;
  message_triggered_id?: string;
  conversation_id?: string;
  message?: string;
  project_id?: string;
  is_newest?: boolean;

  user_detail?: vUserDBO;
  users?: ConversationMessageMembersDBO[];
}
