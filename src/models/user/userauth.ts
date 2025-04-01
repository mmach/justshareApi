'use strict';


/**
 * Interface for UserAuths attributes
 */
export interface UserAuthsDTO {
  id: string;
  user_id?: string;
  socialUser_id?: number;
  socialType?: number;
}
