'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for Translations attributes
 */
export interface TranslationsDBO extends BaseDBO{
  id: string;
  name?: string;
  pl?: string;
  us?: string;
  no?: string;
  de?: string;
  zh_cn?: string;
  fr?: string;
  es?: string;
  ru?: string;
  project_id?: string;
  token?: string;
  respStatus?: string;
  type?: string;
}
