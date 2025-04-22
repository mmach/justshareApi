import { Sequelize, Op, QueryTypes } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { ItemUserActionDBO } from "../../../DBO";
import { ItemUserAction } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IItemUserActionRepository } from "../itemUserActionRepository";

export default class ItemUserActionRepository extends BaseRepositoryType<ItemUserActionDBO, ItemUserAction> implements IItemUserActionRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize };

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.ItemUserAction);
    this.sequelizeDI = sequelizeDI;
  }

  getItemUserActions({ item_id, iua_id, status, transaction }: { item_id?: string, iua_id?: string | string[], status?: number, transaction?: number }): Promise<ItemUserAction[]> {
    let where: Partial<ItemUserActionDBO & { id: string | string[] | any }> = { project_id: this.context.project.id }
    where.id = Array.isArray(iua_id) ? {
      [Op.in]: iua_id
    } : iua_id;
    where.project_id = this.context.project.id;
    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.Conversation,
          required: false,
          as: "conversation",
          include: [
            {
              model: this.sequelizeDI.UserConversation,
              required: true,
              as: "users"
            }
          ]
        },

        {
          model: this.sequelizeDI.V_User,
          required: false,
          as: "users",
          include: [
            {
              model: this.sequelizeDI.Blob,
              as: "blob_profile",
              required: false

            },
          ]
        }
      ],
      transaction: this.getTran({ transaction })

    })
  }




  getItemUserActionsList({ action_id, status_id, size, page, asAdmin, process_id, is_closed, item_id, transaction }: { action_id?: string, status_id?: number, size: number, page: number, asAdmin: boolean, process_id?: string, is_closed?: boolean, item_id?: string, transaction?: number }): Promise<object[]> {

    //move to dynamic sql !!!
    //create new query for search by ppl
    let p_page = Number(page) * Number(size)

    return this.sequelizeDI.sequelize.query(
      `WITH getUsersConv AS ( 
      SELECT conversation_id,iua_id,user_Id FROM Conversations JOIN UserConversations ON Conversations.id=UserConversations.conversation_id  
      WHERE 
      ${asAdmin && this.context.user.is_admin ? '1=1' : 'user_id=:user_id  '}
       AND Conversations.project_id=:project_id
   )
   ,getIUA as ( 
    SELECT ItemUserActions.* , conversation_id FROM ItemUserActions
    JOIN getUsersConv ON getUsersConv.iua_id=ItemUserActions.id
    WHERE ItemUserActions.project_id=:project_id
      ${status_id ? ' AND status_id=:status_id ' : ''}
      ${action_id ? ' AND action_id= :action_id ' : ''}
      ${process_id ? ' AND process_id= :process_id ' : ''}
      ${is_closed == true ? ` AND EXISTS ( SELECT * FROM ProcessChains WHERE 
        ItemUserActions.process_chain_id = ProcessChains .id AND is_last=1) ` : ''}
      ${is_closed == false ? ` AND NOT EXISTS ( SELECT * FROM ProcessChains WHERE 
          ItemUserActions.process_chain_id = ProcessChains .id AND is_last=1) ` : ''}
    
          
    )
   SELECT  getIUA.updated_at as date, * ,COUNT(1) OVER(PARTITION BY NULL ) AS total FROM getIUA
   JOIN ItemTransactions ON getIUA.id=ItemTransactions.iua_Id
   AND ItemTransactions.project_Id=:project_id
   ${item_id ? ` AND ItemTransactions.item_id==:item_id` : ''}
   ORDER BY getIUA.updated_at DESC
   OFFSET ${p_page} ROWS 
  FETCH NEXT ${Number(size)} ROWS ONLY;
   `
      ,
      {
        replacements: {
          project_id: this.context.project.id
          , action_id: action_id
          , status_id: status_id
          , user_id: this.context.user.id
          , process_id: process_id
          , item_id: item_id
        },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      });

  }

  getItemUserActionHistory({ iua_id, transaction }: { iua_id: string, transaction?: number }): Promise<object[]> {

    return this.sequelizeDI.sequelize.query(

      `   
    WITH recus(iua_id) AS (
    SELECT iua_prev_id FROM ItemUserActions
    WHERE id IN (:iua_id)
    UNION ALL
    SELECT ItemUserActions.iua_prev_id  FROM recus JOIN ItemUserActions ON id=recus.iua_id
    ),
    union_recus AS (
    SELECT iua_id FROM recus
    WHERE iua_id IS NOT NULL
    UNION ALL
    SELECT :iua_id
    )
    SELECT union_recus.* FROM union_recus
 `
      ,
      {
        replacements: {
          iua_id: iua_id

        },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      });
  }




  getItem({ uids, toSync, transaction }: { uids: string[], toSync: number, transaction?: number }): Promise<ItemUserAction[]> {
    //  console.log('this.userId')
    //  console.log(this.userId)
    let userId = this.userId;

    let where = {

    }
    if (toSync == 0) {
      where = {
        is_elastic_sync: false
      }
    } else {
      where = {
        id: {
          [Op.in]: uids
        },
        project_id: this.context.project.id
      }
    }
    return this.entityDAO.findAll({
      where: where
      ,
      include: [
        {
          model: this.sequelizeDI.Category,
          required: true,
          as: "category",
          include: [
            {
              model: this.sequelizeDI.Blob,
              as: "icon_blob"

            }
          ]
        },
        {
          model: this.sequelizeDI.Tag,
          required: false,
          as: "tags"
        },
        {
          model: this.sequelizeDI.ItemCategoryOption,
          required: true,
          as: "itemCategoryOption",
          include: [
            {
              model: this.sequelizeDI.CategoryOptionsLink, as: "category_link", required: true,
              include: [
                {
                  model: this.sequelizeDI.CategoryOption, as: "catOption",
                  required: true,
                  include: [
                    {
                      model: this.sequelizeDI.CategoryOptionsType,
                      as: "cat_opt",
                      required: true,
                      where: {
                        status: 1
                      }
                    }
                  ]
                }
              ]
            },
            {
              model: this.sequelizeDI.CategoryOptionsTemplate, as: "cat_opt_temp", required: true,
              include: [{
                model: this.sequelizeDI.CategoryOptionsTypeTemplate,
                required: true,
                as: "cat_opt_type_template"
              }
              ]
            }
          ]
        },
        {
          model: this.sequelizeDI.V_User,
          attributes: ['id', 'name'],
          required: true,
          as: "user"

        },
        {
          model: this.sequelizeDI.Blob,
          as: "blobs",
          required: false,
          where: {
            status: this.sequelizeDI.sequelize.literal(`blobs.status = case when blobs.user_id='${userId ? userId : 0}' then blobs.status else 1 end`)
          },
          include: [
            { model: this.sequelizeDI.BlobMapper, as: "blob_thumbmail" },
            { model: this.sequelizeDI.BlobMapper, as: "blob_item" },
            { model: this.sequelizeDI.BlobMapper, as: "blob_min" }

          ]
        } 
      ],
      transaction: this.getTran({ transaction })
    });
  }
}

export const ItemUserActionRepositoryPlugin = {
  pluginName: "item-user-action-repository",
  type: 'repository',
  di: 'itemUserActionRepositoryDI',
  classType: ItemUserActionRepository
};