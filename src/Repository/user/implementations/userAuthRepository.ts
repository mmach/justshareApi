import { BaseRepositoryType } from "../../../Architecture";
import { UserAuthsDBO } from "../../../DBO";
import { UserAuths } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IUserAuthRepository } from "../userAuthRepository.js";

;

export default class UserAuthRepository extends BaseRepositoryType<UserAuthsDBO, UserAuths> implements IUserAuthRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.UserAuths);
    this.sequelizeDI = sequelizeDI;
  }
}

export const UserAuthRepositoryPlugin = {
  pluginName: "user-auth-repository",
  type: 'repository',
  di: 'userAuthRepositoryDI',
  classType: UserAuthRepository
};