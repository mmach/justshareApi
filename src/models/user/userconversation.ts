'use strict';

import { vUserDTO } from "./v_user";

/**
 * Interface for UserConversation attributes
 */
export interface UserConversationDTO {
  id: string;
  user_id?: string;
  conversation_id?: string;
  project_id?: string;

  user_detail?: vUserDTO;
}
