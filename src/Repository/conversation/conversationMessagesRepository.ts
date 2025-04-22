import { IBaseRepositoryType } from "../../Architecture";
import { ConversationMessagesDBO } from "../../DBO";
import { ConversationMessages } from "../../Domain";


export interface IConversationMessagesRepository
  extends IBaseRepositoryType<ConversationMessagesDBO, ConversationMessages> {}
