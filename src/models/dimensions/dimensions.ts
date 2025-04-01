'use strict';


/**
 * Interface for Dimensions attributes
 */
export interface DimensionsDTO {
  id: string;
  name?: string;
  uniq_name?: string;
  description?: string;
  co_type_id?: string;
  cott_id?: string;
  as_cat_ref?: boolean;
  project_id?: string;
}
