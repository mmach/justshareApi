'use strict';

import { BlobMapperDTO } from "./blobMapper";

/**
 * Interface for Blob attributes
 */
export interface BlobDTO {
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
  
  blob_item:BlobMapperDTO,
  blob_thumbmail:BlobMapperDTO,
  blob_min:BlobMapperDTO
}
