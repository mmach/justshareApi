import { IBaseRepositoryType } from "../../Architecture";
import { UserAuthsDBO } from "../../DBO";
import { UserAuths } from "../../Domain";


export interface IUserAuthRepository extends IBaseRepositoryType<UserAuthsDBO, UserAuths> { }
