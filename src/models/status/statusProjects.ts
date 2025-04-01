'use strict';

import { TranslationsDTO } from "../translations";
import { StatusDTO } from "./status";

/**
 * Interface for StatusProjects attributes
 */
export interface StatusProjectsDTO {
  id: string;
  is_closed?: string;
  translation_id?: string;
  project_id?: string;
  status_id?: string;
  status_order?: string;

  translation?: TranslationsDTO;
  status?: StatusDTO;
}
