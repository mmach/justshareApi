import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for EsItemSync attributes
 */
export interface EsItemSyncDBO extends BaseDBO{
  id: string;
  item_id?: string;
  project_id?: string;
  operation?: string;
}
