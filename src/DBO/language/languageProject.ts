'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { LanguageDBO } from "./language";

/**
 * Interface for LanguageProject attributes
 */
export interface LanguageProjectDBO extends BaseDBO{
  id: string;
  language_id?: string;
  project_id?: string;
  status?: boolean;
  is_main?: boolean;

  lang_details?: LanguageDBO;
}
