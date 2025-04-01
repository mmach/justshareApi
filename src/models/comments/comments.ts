

/**
 * Interface for Comment attributes
 */
export interface CommentDTO {
  id: string;
  user_src_id?: string;
  user_id?: string;
  iua_id?: string;
  item_id?: string;
  comment?: string;
  rate?: number;
  project_id?: string;
  action_id?: string;
  status?: string;
}
