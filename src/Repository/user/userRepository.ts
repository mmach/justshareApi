import { IBaseRepositoryType } from "../../Architecture";
import { UsersDBO } from "../../DBO";
import { Users, vUser } from "../../Domain";


export interface IUserRepository extends IBaseRepositoryType<UsersDBO, Users> {
  getUserInfo({ user_id, transaction }: { user_id: string; transaction?: number }): Promise<vUser | null>;
  getUsersProject({ transaction }: { transaction?: number }): Promise<vUser[]>;
  checkMailInDb({
    email,
    withoutAuth,
    usertypeId,
    transaction
  }: {
    email: string;
    withoutAuth?: boolean;
    usertypeId?: string;
    transaction?: number;
  }): Promise<Users | null>;
  updateRefreshToken({
    id,
    refresh_token,
    relogin_require,
    transaction
  }: {
    id: string;
    refresh_token: string;
    relogin_require: boolean;
    transaction?: number;
  }): Promise<any>;
  getByRefreshToken({ refresh_token, transaction }: { refresh_token: string; transaction?: number }): Promise<Users | null>;
  authorizeUser({ uid, transaction }: { uid: string; transaction?: number }): Promise<any>;
}
