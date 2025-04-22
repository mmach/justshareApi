import { Sequelize } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { ConversationMessagesDBO } from "../../../DBO";
import { ConversationMessages } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";

export default class ConversationMessagesRepository extends BaseRepositoryType<ConversationMessagesDBO, ConversationMessages> {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.ConversationMessages);
    this.sequelizeDI = sequelizeDI;
  }
}



export const ConversationMessagesRepositoryPlugin = {
  pluginName: "conversation-messages-repository",
  type: 'repository',
  di: 'conversationMessagesRepositoryDI',
  classType: ConversationMessagesRepository
};