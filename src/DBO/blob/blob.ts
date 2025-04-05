'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { BlobMapperDBO } from "./blobMapper";

/**
 * Interface for Blob attributes
 */
export interface BlobDBO extends BaseDBO {
  id: string;
  blob_id?: string;
  item_id?: string;
  blob_thumbmail_id?: string;
  blob_min_id?: string;
  user_id?: string;
  order?: number;
  status?: number;
  category_id?: string;
  project_id?: string;
  
  blob_item:BlobMapperDBO,
  blob_thumbmail:BlobMapperDBO,
  blob_min:BlobMapperDBO
}
