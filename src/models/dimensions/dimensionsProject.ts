'use strict';

import { TranslationsDTO } from "../translations";
import { DimensionsDTO } from "./dimensions";

/**
 * Interface for DimensionsProject attributes
 */
export interface DimensionsProjectDTO {
  id: string;
  dimension_id?: string;
  project_id?: string;
  translation_id?: string;

  dimension_details?: DimensionsDTO;
  translation?: TranslationsDTO;
}
