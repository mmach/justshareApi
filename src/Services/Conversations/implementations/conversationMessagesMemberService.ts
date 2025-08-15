import { BaseServiceType } from "../../../Architecture";
import { ConversationMessageMembersDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { ConversationMessageMembers } from "../../../Domain";
import { ConversationMessageMemberDTO } from "../../../Dto";
import { IConversationMessageMembersService } from "../conversationMessagesMemberService";


export default class ConversationMessageMembersService extends BaseServiceType<ConversationMessageMembersDBO, ConversationMessageMembers> implements IConversationMessageMembersService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'conversationMessagesMembersRepository' });
  }

  async getUnreadMsg(): Promise<ConversationMessageMemberDTO[]> {
    return await this.unitOfWorkDI.conversationMessagesMembersRepository.getUnreadMsg({})
  }
  async getConversations({ conv_id, iua_id, page = 0, size = 20, status = 'O' }: { conv_id: string, iua_id: string, page?: number, size?: number, status?: string }): Promise<ConversationMessageMemberDTO[]> {
    return await this.unitOfWorkDI.conversationMessagesMembersRepository.getConversations({ conv_id, iua_id, page, size, status })
  }

}


export const ConversationMessageMembersServicePlugin = {
  pluginName: "conversation-message-members-service",
  type: "service",
  di: "conversationMessageMembersServiceDI",
  classType: ConversationMessageMembersService,
};