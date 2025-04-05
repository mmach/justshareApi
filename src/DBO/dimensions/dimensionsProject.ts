'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { TranslationsDBO } from "../translations";
import { DimensionsDBO } from "./dimensions";

/**
 * Interface for DimensionsProject attributes
 */
export interface DimensionsProjectDBO extends BaseDBO{
  id: string;
  dimension_id?: string;
  project_id?: string;
  translation_id?: string;

  dimension_details?: DimensionsDBO;
  translation?: TranslationsDBO;
}
