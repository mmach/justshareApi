'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


export interface ActionsDBO extends BaseDBO {
  id: string;
  name?: string;
  status?: boolean;
  description?: string;
  for_category?: boolean;
  action_type?: string;
  is_process_start?: boolean;
  project_id?: string;
}
