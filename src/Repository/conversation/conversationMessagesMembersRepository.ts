import { IBaseRepositoryType } from "../../Architecture";
import { ConversationMessageMembersDBO } from "../../DBO";
import { ConversationMessageMembers } from "../../Domain";
import { ConversationMessageMemberDTO } from "../../Dto";




export interface IConversationMessagesMembersRepository
  extends IBaseRepositoryType<ConversationMessageMembersDBO, ConversationMessageMembers> {
  getUnreadMsg({ transaction }: { transaction?: number }): Promise<ConversationMessageMemberDTO[]>;
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
  }): Promise<ConversationMessageMemberDTO[]>;
}
