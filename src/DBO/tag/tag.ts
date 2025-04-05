'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Tag attributes
 */
export interface TagDBO extends BaseDBO{
  id: string;
  tag?: string;
  project_id?: string;
}
