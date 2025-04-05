'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Dimensions attributes
 */
export interface DimensionsDBO extends BaseDBO{
  id: string;
  name?: string;
  uniq_name?: string;
  description?: string;
  co_type_id?: string;
  cott_id?: string;
  as_cat_ref?: boolean;
  project_id?: string;
}
