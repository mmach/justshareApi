import { QueryTypes, Sequelize } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { ConversationMessageMembersDBO } from "../../../DBO";
import { ConversationMessageMembers } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IConversationMessagesMembersRepository } from "../conversationMessagesMembersRepository";
import { ConversationMessageMemberDTO } from "../../../Dto";


export default class ConversationMessagesMembersRepository extends BaseRepositoryType<ConversationMessageMembersDBO, ConversationMessageMembers> implements IConversationMessagesMembersRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.ConversationMessageMembers);
    this.sequelizeDI = sequelizeDI;
  }

  getUnreadMsg({ transaction }: { transaction?: number }): Promise<ConversationMessageMemberDTO[]> {
    return this.sequelizeDI.sequelize.query<ConversationMessageMemberDTO>(
      `WITH getConvs as (
        SELECT  MAX(Conversations.id ) as id ,
            MAX(Conversations.title ) as conversation_title ,
            MAX(Conversations.status ) as conversation_status ,
            MAX([UserConversations].id ) as message_member_id, 
            MAX([UserConversations].user_id ) as user_id, 
            0 as NumberOfUnreaded,
          MAX([UserConversations].created_at) as created_at
          FROM Conversations
            JOIN [UserConversations] 
              ON [UserConversations].conversation_id = Conversations.id
          WHERE 
          [UserConversations].user_id=:user_id
            AND Conversations.status=:statusConversation
            AND Conversations.project_id=:project_id
          GROUP BY Conversations.id  
          ),
           getUnreadConv as (
              SELECT  MAX(UserConversations.conversation_id )as id ,       
                  COUNT(message_id) as NumberOfUnreaded
                FROM UserConversations
                  JOIN ConversationMessageMembers ON ConversationMessageMembers.conversation_id = UserConversations.conversation_id
                WHERE ConversationMessageMembers.user_id=:user_id
                  AND ConversationMessageMembers.status=:statusMember
                GROUP BY UserConversations.conversation_id  
                )
        SELECT
          results.id as conversation_id ,
          results.conversation_title,
          results.conversation_status,
          results.message_member_id,
          unreadConvs.NumberOfUnreaded as number_of_unreaded,
          cm.message,
          cm.message_user_id as message_owner_user_id,
          cm.created_at,
          cmu.member_user_id as participant_user_id,
          name as participant_name,
          nickname as participant_name,
          blob_min_id as participant_blob_id,
          conv_members_count,
          :project_id as project_id 
        FROM getConvs results
        JOIN getUnreadConv  unreadConvs on results.id = unreadConvs.id
        CROSS APPLY ( SELECT TOP 1 ConversationMessages.* ,ConversationMessages.user_id as message_user_id
                  FROM ConversationMessages 
                  JOIN ConversationMessageMembers  ON ConversationMessageMembers.message_id = ConversationMessages.id
                  WHERE ConversationMessages.conversation_id=results.id 
                    AND is_newest=1 
                    ) as cm
          CROSS APPLY ( SELECT TOP 1  MAX([UserConversations].user_id) as member_user_id, COUNT([UserConversations].user_id) as conv_members_count
                    FROM  [UserConversations]  
                    WHERE [UserConversations].conversation_id = results.id
                      AND [UserConversations].user_id!=results.user_id
                      GROUP BY [UserConversations].conversation_id) as cmu
        CROSS APPLY ( SELECT TOP 1 V_Users.id as user_src_id, 
                  V_Users.name ,
                  V_Users.nickname,
                  Blobs.blob_min_Id 
                FROM V_Users
                JOIN Blobs ON V_Users.blob_id = Blobs.id 
                  WHERE V_Users.id=cmu.member_user_id ) as cmm
          WHERE unreadConvs.NumberOfUnreaded>0
        ORDER BY results.created_at desc
    --    OFFSET 5 ROWS
        --  FETCH NEXT 5 ROWS ONLY`,
      {
        replacements: {
          statusConversation: 'O',
          project_id: this.context.project.id,
          statusMember: 'N',
          user_id: this.context.user.id
        },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    )



  }
  getConversations({ conv_id, iua_id, page = 0, size = 20, status = 'O', transaction }: { conv_id?: string, iua_id?: string, page?: number, size?: number, status?: string, transaction?: number }): Promise<ConversationMessageMemberDTO[]> {
    let offset = page * size;

    return this.sequelizeDI.sequelize.query<ConversationMessageMemberDTO>(
      `WITH getConvs as (
        SELECT  MAX(Conversations.id ) as id ,
            MAX(Conversations.title ) as conversation_title ,
            MAX(Conversations.status ) as conversation_status ,
            MAX([UserConversations].id ) as message_member_id, 
            MAX([UserConversations].user_id ) as user_id, 
            MAX([Conversations].iua_id ) as iua_id, 
            0 as NumberOfUnreaded,
          MAX([UserConversations].created_at) as created_at
          FROM Conversations
            JOIN [UserConversations] 
              ON [UserConversations].conversation_id = Conversations.id
          WHERE 
          [UserConversations].user_id=:user_id
            AND Conversations.status=:statusConversation
            AND Conversations.project_id=:project_id
          GROUP BY Conversations.id  
          ),
           getUnreadConv as (
              SELECT  MAX(UserConversations.conversation_id )as id ,       
                  COUNT(message_id) as NumberOfUnreaded
                FROM UserConversations
                  JOIN ConversationMessageMembers ON ConversationMessageMembers.conversation_id = UserConversations.conversation_id
                WHERE ConversationMessageMembers.user_id=:user_id
                  AND ConversationMessageMembers.status=:statusMember
                GROUP BY UserConversations.conversation_id  
                )
        SELECT
          results.id as conversation_id ,
          results.conversation_title,
          results.conversation_status,
          results.message_member_id,
          results.iua_id,
          unreadConvs.NumberOfUnreaded as number_of_unreaded,
          cm.message,
          cm.message_user_id as message_owner_user_id,
          cm.created_at,
          cmu.member_user_id as participant_user_id,
          name as participant_name,
          nickname as participant_name,
          blob_min_id as participant_blob_id,
          conv_members_count
        FROM getConvs results
        LEFT JOIN getUnreadConv  unreadConvs on results.id = unreadConvs.id
        CROSS APPLY ( SELECT TOP 1 ConversationMessages.* ,ConversationMessages.user_id as message_user_id
                  FROM ConversationMessages 
                  JOIN ConversationMessageMembers  ON ConversationMessageMembers.message_id = ConversationMessages.id
                  WHERE ConversationMessages.conversation_id=results.id 
                    AND is_newest=1 
                    ) as cm
          CROSS APPLY ( SELECT TOP 1  MAX([UserConversations].user_id) as member_user_id, COUNT([UserConversations].user_id) as conv_members_count
                    FROM  [UserConversations]  
                    WHERE [UserConversations].conversation_id = results.id
                      AND [UserConversations].user_id!=results.user_id
                      GROUP BY [UserConversations].conversation_id) as cmu
        CROSS APPLY ( SELECT TOP 1 V_Users.id as user_src_id, 
                  V_Users.name ,
                  V_Users.nickname,
                  Blobs.blob_min_Id 
                FROM V_Users
                JOIN Blobs ON V_Users.blob_id = Blobs.id 
                  WHERE V_Users.id=cmu.member_user_id ) as cmm
          
        ORDER BY results.created_at desc
        OFFSET :offset ROWS
          FETCH NEXT :size ROWS ONLY`,
      {
        replacements: {
          statusConversation: status ? status : 'O',
          project_id: this.context.project.id,
          statusMember: 'N',
          user_id: this.context.user.id,
          offset: offset,
          size: size
        },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    )



  }
}


export const ConversationMessagesMembersRepositoryPlugin = {
  pluginName: "conversation-messages-members-repository",
  type: 'repository',
  di: 'conversationMessagesMembersRepositoryDI',
  classType: ConversationMessagesMembersRepository
};