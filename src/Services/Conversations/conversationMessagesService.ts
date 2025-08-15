import { IBaseServiceType } from "../../Architecture";
import { ConversationMessagesDBO } from "../../DBO";
import { ConversationMessages } from "../../Domain";

export interface IConversationMessagesService extends IBaseServiceType<ConversationMessagesDBO, ConversationMessages> {}


