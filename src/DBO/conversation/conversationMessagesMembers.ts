'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for ConversationMessageMembers attributes
 */
export interface ConversationMessageMembersDBO extends BaseDBO{
  id: string;
  user_id?: string;
  conversation_id?: string;
  message_id?: string;
  project_id?: string;
  status?: string;
}
