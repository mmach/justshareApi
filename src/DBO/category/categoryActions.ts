'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for CategoryActions attributes
 */
export interface CategoryActionsDBO extends BaseDBO {
  id: string;
  action_id?: string;
  category_id?: string;
}
