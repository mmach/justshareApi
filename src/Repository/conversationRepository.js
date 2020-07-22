import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { CityDTO } from "justshare-shared";
import PrepareSearch from "../Architecture/prepareSearch.js";



/**
 *
 * @export
 * @class CityRepository
 * @extends BaseRepository
 */
export default class ConversationRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CityRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Conversation);
    this.sequelizeDI = sequelizeDI;
  }
  getUserConversation({ conv_id, last_msg, size, transaction }) {
    let replacements = {
      conv_id: conv_id,
      last_msg: last_msg, size: size,
      project_id: this.context.project.id,
      size: size
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
            WHERE rn<:size
            AND ConversationMessages.conversation_id=recus.conv_id
              )
                SELECT *
                FROM recus    
    
    `,
      {
        replacements: replacements,
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );
    //  console.log(obj)

  }

  getMessages({ conv_id, message_list_id, transaction }) {

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
  getUserConversations({ page, size, transaction }) {

    let offset = page * size;
    let limit = size
    return this.entityDAO.findAll({
      offset,
      limit,
      where: {

      },
      order: [['messages', 'created_at', 'DESC']]
      ,
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
          model: this.sequelizeDI.UserConversation,
          attributes: [],
          as: "user_filter",
          required: true,
          where: {
            user_id: this.context.user.id
          }
        }
        ,
        {
          model: this.sequelizeDI.ConversationMessages,
          as: "messages",
          required: false,
          where: {
            is_newest: true
          },
          include: [{
            model: this.sequelizeDI.ConversationMessageMembers,
            as: "users",
            required: true,
          }],

        },
      ]
      ,
      transaction: this.getTran({ transaction })
    });
  }

}

