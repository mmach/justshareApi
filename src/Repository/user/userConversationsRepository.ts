import { IBaseRepositoryType } from "../../Architecture";
import { UserConversationDBO } from "../../DBO";
import { UserConversation } from "../../Domain";


export interface IUserConversationsRepository extends IBaseRepositoryType<UserConversationDBO, UserConversation> {}
