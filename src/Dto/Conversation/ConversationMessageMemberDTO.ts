export type ConversationMessageMemberDTO = {
  conversation_id: string;
  conversation_title: string;
  conversation_status: string;
  message_member_id: string;
  number_of_unreaded: number;
  message: string;
  message_owner_user_id: string;
  created_at: Date;
  participant_user_id: string;
  participant_name: string;
  participant_nickname: string;
  participant_blob_id: string;
  conv_members_count: number;
  project_id?: string;
  iua_id?:string;
  
};