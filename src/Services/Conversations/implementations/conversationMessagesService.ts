import { BaseServiceType } from "../../../Architecture";
import { ConversationMessagesDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { ConversationMessages } from "../../../Domain";
import { IConversationMessagesService } from "../conversationMessagesService";


export default class ConversationMessagesService extends BaseServiceType<ConversationMessagesDBO, ConversationMessages> implements IConversationMessagesService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'conversationMessagesRepository' });
  }
}

export const ConversationMessagesServicePlugin = {
  pluginName: "conversation-messages-service",
  type: "service",
  di: "conversationMessagesServiceDI",
  classType: ConversationMessagesService,
};