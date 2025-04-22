import { IBaseRepositoryType } from "../../Architecture";
import { ConversationMessageMembersDBO } from "../../DBO";
import { ConversationMessageMembers } from "../../Domain";




export interface IConversationMessagesMembersRepository
  extends IBaseRepositoryType<ConversationMessageMembersDBO, ConversationMessageMembers> {
  getUnreadMsg({ transaction }: { transaction?: number }): Promise<object[]>;
  getConversations({
    conv_id,
    iua_id,
    page,
    size,
    status,
    transaction
  }: {
    conv_id?: string;
    iua_id?: string;
    page?: number;
    size?: number;
    status?: string;
    transaction?: number;
  }): Promise<object[]>;
}
