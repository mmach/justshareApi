'use strict';


/**
 * Interface for ConversationMessageMembers attributes
 */
export interface ConversationMessageMembersDTO {
  id: string;
  user_id?: string;
  conversation_id?: string;
  message_id?: string;
  project_id?: string;
  status?: string;
}
