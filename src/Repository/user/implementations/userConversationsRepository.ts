import { BaseRepositoryType } from "../../../Architecture";
import { UserConversationDBO } from "../../../DBO";
import { UserConversation } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IUserConversationsRepository } from "../userConversationsRepository";

export default class UserConversationsRepository extends BaseRepositoryType<UserConversationDBO, UserConversation> implements IUserConversationsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.UserConversation);
    this.sequelizeDI = sequelizeDI;
  }
}


export const UserConversationsRepositoryPlugin = {
  pluginName: "user-conversations-repository",
  type: 'repository',
  di: 'userConversationsRepositoryDI',
  classType: UserConversationsRepository
};