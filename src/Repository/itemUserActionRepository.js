import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { SearchItemDTO } from 'justshare-shared';
import uuidv4 from "uuid/v4";

/**
 *
 * @export
 * @class BlobRepository
 * @extends ItemRepository
 */
export default class ItemUserActionRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof ItemRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ItemUserAction);
    this.sequelizeDI = sequelizeDI;
  }




  getItemUserActions({ item_id, iua_id, status, transaction }) {
    let where = { project_id: this.context.project.id }
    where.id = iua_id
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
          required: true,
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




  getItemUserActionsList({ action_id, status_id, size, page, transaction }) {

    //move to dynamic sql !!!
    //create new query for search by ppl
    let p_page = Number(page) * Number(size)

    return this.sequelizeDI.sequelize.query(
      `WITH getUsersConv AS ( 
      SELECT conversation_id,iua_id,user_Id FROM Conversations JOIN UserConversations ON Conversations.id=UserConversations.conversation_id  
      WHERE user_id=:user_id
       AND Conversations.project_id=:project_id
   )
   ,getIUA as ( 
   SELECT ItemUserActions.* , conversation_id FROM ItemUserActions
   JOIN getUsersConv ON getUsersConv.iua_id=ItemUserActions.id
   WHERE ItemUserActions.project_id=:project_id
    ${status_id ? ' AND status_id=:status_id ' : ''}
    ${action_id ? ' AND action_id= :action_id ' : ''}
   
    )
   SELECT  getIUA.updated_at as date, * ,COUNT(1) OVER(PARTITION BY NULL ) AS total FROM getIUA
   JOIN ItemTransactions ON getIUA.id=ItemTransactions.iua_Id
   AND ItemTransactions.project_Id=:project_id
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
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }

  getItemUserActionHistory({ iua_id, transaction }) {

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
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });
  }

  /**
   *
   *
    * @param {{search: SearchItemDTO}}
   * @returns
   * @memberof ItemRepository
   */
  searchItem({ search, transaction }) {

    //move to dynamic sql !!!
    //create new query for search by ppl
    let freetext = search.prepareSearch(search.freetext, 1)
    let checkCategories = search.categoryList.length > 0;
    let withQuery = [];
    if (checkCategories) {
      withQuery.push(`get_all_match AS (
          SELECT item_id, COUNT(*) as match_counter FROM ItemCategories 
          WHERE category_id IN (:categories)
          GROUP BY  item_id)`);
      withQuery.push(
        `match_count AS ( SELECT
          get_all_match.item_id,
        (match_counter*100/${search.categoryList.length}) filterCount,
        MAX((match_counter*100/${search.categoryList.length})) OVER( PARTITION BY 1) as Max_MAtch 
        FROM get_all_match
        WHERE 
        (match_counter*100/${search.categoryList.length})>50
        )`)
    }
    if (freetext.length > 1) {
      withQuery.push(
        `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK]
              FROM 
              CONTAINSTABLE (Items,  
                ${this.context.language == 'pl' ? 'clobSearch_pl' : 'clobSearch_us'}, 
                :freetext,
                LANGUAGE '${this.context.language == 'pl' ? 'polish' : 'english'}'
              --	20  
              )  ) as t
              WHERE RANK > 0 
              
          )`

      )
    }
    if (freetext.length > 1) {
      withQuery.push(`get_results AS (
        SELECT
            Items.*, 
            ${checkCategories ? 'match_count.Max_MAtch' : '0'} AS max_match,
            ${checkCategories ? 'match_count.filterCount' : '0'} AS filter_count,
            COUNT(*) OVER(PARTITION BY 1) as counter,
            
          ${freetext.length > 0 ? 'RANK' : '1'} AS ft_rank
        FROM Items
        ${checkCategories ? 'JOIN match_count ON item_id=Items.id' : ''}
        ${freetext.length > 0 ? 'JOIN search_fts ON search_fts.[KEY] = Items.id' : ''}
         
      )`)


    }
    return this.sequelizeDI.sequelize.query(
      `WITH 
        ${withQuery.join(',')}
        SELECT 
        ROW_NUMBER() OVER( ORDER BY MAX(filter_count) DESC,COUNT(get_results.id) DESC,
        MAX(ft_RANK) DESc) AS rnum,
        Users.Id as id,
         Users.name,
          MAX(filter_count) as max,
          COUNT(get_results.id) as number_of_matched,
          COUNT(Users.Id) OVER(PARTITION BY 1) as row_count
         FROM 
        Users
         JOIN  get_results ON user_id=Users.Id
        WHERE 
          100 = (CASE WHEN Max_MAtch=100 then  filter_count else 100 end )
          GROUP BY Users.Id,Users.name
        ORDER BY 
        MAX(filter_count) DESC,
        COUNT(get_results.id) DESC,
        MAX(ft_RANK) DESc
        OFFSET :page_size * (:page_number - 1) ROWS
          FETCH NEXT :page_size ROWS ONLY;`
      ,
      {
        replacements: {
          categories: search.categoryList
          , page_size: search.size
          , page_number: search.page
          , freetext: freetext
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }

  search({ search, transaction }) {

    //move to dynamic sql !!!
    //create new query for search by ppl
    console.log(this.context);
    let freetext = search.prepareSearch(search.freetext, 1)
    console.log(freetext);
    let checkCategories = search.categoryList.length > 0;
    let withQuery = [];
    if (checkCategories) {
      withQuery.push(`get_all_match AS (
          SELECT item_id, COUNT(*) as match_counter FROM ItemCategories 
          WHERE category_id IN (:categories)
          GROUP BY  item_id)`);
      withQuery.push(
        `match_count AS ( SELECT
          get_all_match.item_id,
        (match_counter*100/${search.categoryList.length}) filterCount,
        MAX((match_counter*100/${search.categoryList.length})) OVER( PARTITION BY 1) as Max_MAtch 
        FROM get_all_match
        WHERE 
        (match_counter*100/${search.categoryList.length})>50
        )`)
    }
    if (freetext.length > 1) {
      withQuery.push(
        `search_fts as (
            SELECT t.* FROM (SELECT 
              [KEY],
              ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK]
              FROM 
              CONTAINSTABLE (Items,  
                ${this.context.language == 'pl' ? 'clobSearch_pl' : 'clobSearch_us'}, 
                :freetext,
                LANGUAGE '${this.context.language == 'pl' ? 'polish' : 'english'}'
              --	20  
              )  ) as t
              WHERE RANK > 0 
              
          )`

      )
    }
    if (freetext.length > 1) {
      withQuery.push(`get_results AS (
        SELECT
            Items.*, 
            ${checkCategories ? 'match_count.Max_MAtch' : '0'} AS max_match,
            ${checkCategories ? 'match_count.filterCount' : '0'} AS filter_count,
            COUNT(*) OVER(PARTITION BY 1) as counter,
            
          ${freetext.length > 0 ? 'RANK' : '1'} AS ft_rank
        FROM Items
        ${checkCategories ? 'JOIN match_count ON item_id=Items.id' : ''}
        ${freetext.length > 0 ? 'JOIN search_fts ON search_fts.[KEY] = Items.id' : ''}
         
      )`)


    }
    return this.sequelizeDI.sequelize.query(
      `WITH 
        ${withQuery.join(',')}
        SELECT 
          ROW_NUMBER() OVER( ORDER BY filter_count DESC) as rnum, 
          COUNT(Id) OVER(PARTITION BY 1) as row_count,
          get_results.*
         FROM get_results 
        WHERE 
          100 = (CASE WHEN Max_MAtch=100 then  filter_count else 100 end )
          AND user_id=ISNULL(:user_id,user_id)
        ORDER BY 
        filter_count DESC,
        ft_RANK DESc
        OFFSET :page_size * (:page_number - 1) ROWS
          FETCH NEXT :page_size ROWS ONLY;`
      ,
      {
        replacements: {
          categories: search.categoryList
          , page_size: search.size
          , page_number: search.page
          , freetext: freetext
          , user_id: search.user_id
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }

  setAsSyncElastic({ id, transaction }) {
    return this.entityDAO.update(
      {
        is_elastic_sync: true
      },
      {
        where: { id: this.toStr(id) },
        transaction: this.getTran({ transaction })
      }
    );
  }

  getItemToSync({ transaction }) {
    let userId = this.userId;

    let where = {
      is_elastic_sync: false,
      user_id: userId
    }

    return this.entityDAO.findAll({
      where: where
      ,
      include: [
        {
          model: this.sequelizeDI.Category,
          required: true,
          as: "category"
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
        } //,
        // {
        //   model: this.sequelizeDI.CategoryHierarchy,
        //   as: "category_parent"
        // }
      ],
      transaction: this.getTran({ transaction })
    });
  }


  getItem({ uids, toSync, transaction }) {
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
          [SequelizeDB.Sequelize.Op.in]: uids
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
        } //,
        // {
        //   model: this.sequelizeDI.CategoryHierarchy,
        //   as: "category_parent"
        // }
      ],
      transaction: this.getTran({ transaction })
    });
  }

  deleteTag({ item_id, transaction }) {
    return this.sequelizeDI.ItemTag.destroy({
      where: {
        item_id: this.toStr(item_id),
        project_id: this.context.project.id

      },
      transaction: this.getTran({ transaction })
    });
  }
  insertTag({ tag_id, item_id, transaction }) {

    console.log(tag_id)
    return this.sequelizeDI.ItemTag.create(
      {
        id: uuidv4(),
        item_id: item_id,
        tag_id: tag_id,
        project_id: this.context.project.id
      }, {
      transaction: this.getTran({ transaction })
    });

  }

}
