'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Language attributes
 */
export interface LanguageDBO extends BaseDBO{
  id: string;
  name?: string;
  code?: string;
  project_id?: string;
}
