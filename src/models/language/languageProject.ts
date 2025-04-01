'use strict';

import { LanguageDTO } from "./language";

/**
 * Interface for LanguageProject attributes
 */
export interface LanguageProjectDTO {
  id: string;
  language_id?: string;
  project_id?: string;
  status?: boolean;
  is_main?: boolean;

  lang_details?: LanguageDTO;
}
