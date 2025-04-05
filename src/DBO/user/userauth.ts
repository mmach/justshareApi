'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for UserAuths attributes
 */
export interface UserAuthsDBO extends BaseDBO{
  id: string;
  user_id?: string;
  socialUser_id?: number;
  socialType?: number;
}
