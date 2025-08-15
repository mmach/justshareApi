import { IBaseServiceType } from "../../Architecture";
import { ConversationMessageMembersDBO } from "../../DBO";
import { ConversationMessageMembers } from "../../Domain";
import { ConversationMessageMemberDTO } from "../../Dto";


export interface IConversationMessageMembersService
  extends IBaseServiceType<ConversationMessageMembersDBO, ConversationMessageMembers> {
  getUnreadMsg(): Promise<ConversationMessageMemberDTO[]>;
  getConversations(params: {
    conv_id: string;
    iua_id: string;
    page?: number;
    size?: number;
    status?: string;
  }): Promise<ConversationMessageMemberDTO[]>;
}
