'use strict';

import { BlobDTO } from "../blob";
import { ProjectDTO } from "../project";
import { TranslationsDTO } from "../translations";

/**
 * Interface for UserTypes attributes
 */
export interface UserTypesDTO {
  id: string;
  translation_id?: string;
  project_id?: string;
  blob_id?: string;
  name?: string;

  translation?: TranslationsDTO;
  project?: ProjectDTO;
  usertype_roles?: UserTypesDTO[];
  icon?: BlobDTO;
}
