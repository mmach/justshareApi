import { QueryTypes, Sequelize } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture/index.js";
import { ConversationDBO } from "../../../DBO/index.js";
import { Conversation, ConversationMessages } from "../../../Domain/index.js";
import { IMappsDbModels } from "../../../Domain/models.js";
import { IConversationRepository } from "../conversationRepository.js";

export default class ConversationRepository extends BaseRepositoryType<ConversationDBO, Conversation> implements IConversationRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Conversation);
    this.sequelizeDI = sequelizeDI;
  }
  getUserConversation({ conv_id, iua_id, last_msg, size, transaction }: { conv_id: string, iua_id: string, last_msg: string, size: number, transaction?: number }): Promise<object[]> {
    let replacements = {
      conv_id: conv_id,
      last_msg: last_msg,
      size: size,
      project_id: this.context.project.id
    };

    return this.sequelizeDI.sequelize.query(
      `
      WITH recus(msg_id,conv_id,message_triggered_id,rn) AS (
        SELECT id,conversation_id,message_triggered_id,0 FROM ConversationMessages
        WHERE
            ${last_msg ? 'id = :last_msg' : 'is_newest=1'}
            AND conversation_id=:conv_id
            AND project_Id=:project_id
          UNION ALL
              SELECT ConversationMessages.id,conversation_id,ConversationMessages.message_triggered_id,rn+1  FROM recus JOIN ConversationMessages ON ConversationMessages.id=recus.message_triggered_id
            WHERE rn < :size
            AND ConversationMessages.conversation_id=recus.conv_id
              )
                SELECT *
                FROM recus    
    
    `,
      {
        replacements: replacements,
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    );
  }

  getMessages({ conv_id, message_list_id, transaction }: { conv_id: string, message_list_id: any[], transaction?: number }): Promise<ConversationMessages[]> {

    return this.sequelizeDI.ConversationMessages.findAll({
      order: [['created_at', 'DESC']],

      where: {
        id: message_list_id.map(i => i.msg_id),
        conversation_id: conv_id,
        project_id: this.context.project.id
      },
      include: [{
        model: this.sequelizeDI.ConversationMessageMembers,
        as: "users",
        required: true,
      }],
      transaction: this.getTran({ transaction })

    }
    );
  }

  async getUserConversations({ conv_id, iua_id, page, size, status, transaction }: { conv_id: string, iua_id: string, page: number, size: number, status: string, transaction?: number }): Promise<Conversation[]> {

    let offset = page * size;
    let limit = size
    let where: Partial<ConversationDBO> = { project_id: this.context.project.id }
    if (iua_id) {
      where = {
        ...where,
        iua_id: iua_id,
      }
      offset = 0;
      limit = 1
    }
    if (conv_id) {
      offset = 0;
      limit = 1;
      where = {
        ...where,
        id: conv_id
      }

    }

    let obj = await this.sequelizeDI.sequelize.query(
      `WITH getUsersConv as ( 
        SELECT  conversation_id FROM UserConversations 
        WHERE
         project_id=:project_id
          ${this.context.user.is_root || this.context.user.is_admin ? ` ` : 'AND user_id=:user_id '}
        )
        SELECT  Conversations.id FROM ConversationMessages 
        JOIN getUsersConv ON getUsersConv.conversation_id =   ConversationMessages.conversation_id
        JOIN Conversations ON Conversations.id =ConversationMessages.conversation_id 
        WHERE ConversationMessages.is_newest=1
        AND Conversations.project_id=:project_id
        ${conv_id ? 'AND Conversations.id=:conv_id' : ''}
        ${iua_id ? 'AND Conversations.iua_id=:iua_id' : ''}
        ${status ? ' AND Conversations.status=:status ' : ''}
        ORDER BY ConversationMessages.created_at DESC offset :offset rows FETCH next :limit rows only`
      ,
      {
        replacements: {
          user_id: this.context.user.id,
          iua_id: iua_id,
          conv_id: conv_id,
          project_id: this.context.project.id,
          status: status,
          offset: offset,
          limit: limit
        },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      });

    return this.entityDAO.findAll({
      where: {
        id: obj.map((i: any) => i.id)
      },
      include: [
        {
          model: this.sequelizeDI.UserConversation,
          as: "users",

          required: false,
          include: [
            {
              model: this.sequelizeDI.V_User,
              as: "user_detail",
              required: true,
              include: [
                {
                  model: this.sequelizeDI.Blob,
                  as: "blob_profile",
                  required: false

                },


              ],
            },
          ]
        },


        {
          model: this.sequelizeDI.ConversationMessages,
          as: "messages",
          required: true,
          where: {
            is_newest: true
          },
          include: [{
            model: this.sequelizeDI.ConversationMessageMembers,
            as: "users",
            required: false,
          }],

        },
      ]
      ,
      transaction: this.getTran({ transaction })
    });
  }




  async getUserConversationInfo({ conversation_id, iua_id, transaction }: { conversation_id: string, iua_id: string, transaction?: number }): Promise<Conversation[]> {

    let where: Partial<ConversationDBO> = { project_id: this.context.project.id }
    if (iua_id) {
      where = {
        ...where,
        iua_id: iua_id,
      }

    }
    if (conversation_id) {

      where = {
        ...where,
        id: conversation_id
      }

    }

    return this.entityDAO.findAll({
      where,
      include: [
        {
          model: this.sequelizeDI.UserConversation,
          as: "users",

          required: false,
          include: [
            {
              model: this.sequelizeDI.V_User,
              as: "user_detail",
              required: true,
              include: [
                {
                  model: this.sequelizeDI.Blob,
                  as: "blob_profile",
                  required: false

                },


              ],
            },
          ]
        }
      ]
      ,
      transaction: this.getTran({ transaction })
    });
  }
  closeConversation({ id, iua_id, transaction }: { id: string, iua_id: string, transaction?: number }): Promise<[affectedCount: number]> {
    return this.entityDAO.update(
      {
        status: 'C'
      },
      {
        where: {
          iua_id: this.toStr(iua_id),
          project_id: this.context.project.id
        },
        transaction: this.getTran({ transaction })
      }
    );
  }


  setStatusConversation({ iua_id, status, transaction }: { iua_id: string, status: string, transaction?: number }): Promise<[affectedCount: number]> {
    return this.entityDAO.update(
      {
        status: status
      },
      {
        where: {
          iua_id: this.toStr(iua_id),
          project_id: this.context.project.id
        },
        transaction: this.getTran({ transaction })
      }
    );
  }
}


export const ConversationRepositoryPlugin = {
  pluginName: "conversation-repository",
  type: 'repository',
  di: 'conversationRepositoryDI',
  classType: ConversationRepository
};