'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { TranslationsDBO, ProjectDBO, BlobDBO } from "../../DBO";

/**
 * Interface for UserTypes attributes
 */
export interface UserTypesDBO extends BaseDBO{
  id: string;
  translation_id?: string;
  project_id?: string;
  blob_id?: string;
  name?: string;

  translation?: TranslationsDBO;
  project?: ProjectDBO;
  usertype_roles?: UserTypesDBO[];
  icon?: BlobDBO;
}
