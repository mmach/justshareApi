'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { vUserDBO } from "./v_user";

/**
 * Interface for UserConversation attributes
 */
export interface UserConversationDBO extends BaseDBO{
  id: string;
  user_id?: string;
  conversation_id?: string;
  project_id?: string;

  user_detail?: vUserDBO;
}
