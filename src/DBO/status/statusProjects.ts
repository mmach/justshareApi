'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { TranslationsDBO } from "../translations";
import { StatusDBO } from "./status";

/**
 * Interface for StatusProjects attributes
 */
export interface StatusProjectsDBO extends BaseDBO{
  id: string;
  is_closed?: string;
  translation_id?: string;
  project_id?: string;
  status_id?: string;
  status_order?: string;

  translation?: TranslationsDBO;
  status?: StatusDBO;
}
