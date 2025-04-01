

/**
 * Interface for ItemProcessState attributes
 */
export interface ItemProcessStateDTO {
  id: string;
  item_id?: string;
  project_id?: string;
  user_id?: string;
  process_id?: string;
  process_chain_id?: string;
  step_order?: number;
}
