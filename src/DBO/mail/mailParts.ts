'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for MailParts attributes
 */
export interface MailPartsDBO extends BaseDBO{
  id: string;
  project_id?: string;
  name?: string;
  type?: string;
  body?: string;
}

