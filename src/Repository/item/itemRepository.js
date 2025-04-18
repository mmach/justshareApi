import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { SearchItemDTO } from 'justshare-shared';
import {v4} from "uuid";

/**
 *
 * @export
 * @class BlobRepository
 * @extends ItemRepository
 */
export default class ItemRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof ItemRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Item);
    this.sequelizeDI = sequelizeDI;
    this.itemCategoryOptionTermDB = sequelizeDI.ItemCategoryOptionTerm
    this.itemProcessStateDB = sequelizeDI.ItemProcessState

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
              required: false,
              model: this.sequelizeDI.Blob,
              as: "icon_blob"

            }
          ]
        },
        {
          model: this.sequelizeDI.ItemCategoryOptionTerm,
          required: false,
          as: "itemCategoryOptionTerms",

        }

        ,
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
                      required: false,
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

    return this.sequelizeDI.ItemTag.create(
      {
        id: v4(),
        item_id: item_id,
        tag_id: tag_id,
        project_id: this.context.project.id
      }, {
      transaction: this.getTran({ transaction })
    });

  }
  addCategoryOptionTerm({ model, transaction }) {

    return this.itemCategoryOptionTermDB.create(
      {
        ...model,
        project_id: this.context.project.id
      }, {
      transaction: this.getTran({ transaction })
    });

  }

  removeCategoryOptionTerm({ id, iua_id, transaction }) {

    let where = { project_id: this.context.project.id };
    if (iua_id) {
      where.iua_id == iua_id;
    }
    if (id) {
      where.id == id
    }
    return this.itemCategoryOptionTermDB.destroy({
      where: where,
      transaction: this.getTran({ transaction })
    });
  }

  async setItemProcessChain({ id, item_id, process_id, process_chain_id, transaction }) {
    let obj = await this.entityDAO.findAll({
      where: { id: item_id },
      transaction: this.getTran({ transaction })
    })
    let step_order = 0;
    if (obj[0].dataValues.item_process_id) {
      let processChain = await this.itemProcessStateDB.findAll({
        where: { id: obj[0].dataValues.item_process_id },
        transaction: this.getTran({ transaction })
      })
      step_order = processChain[0].dataValues.step_order + 1

    }

    await this.itemProcessStateDB.create({
      id: id,
      item_id: item_id,
      process_chain_id: process_chain_id,
      process_id: process_id,
      user_id: this.context.user.id,
      project_id: this.context.project.id,
      step_order: step_order
    }, {
      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    })

  }

  isFreeTerm({ model, transaction }) {

    return this.sequelizeDI.sequelize.query(
      `WITH getAllReservation AS ( 
          SELECT* FROM [ItemCategoryOptionTerms] 
          WHERE item_id=:item_id
          AND dim_id=:dim_id
        ),
        frameTime AS ( 
          SELECT* FROM getAllReservation 
          WHERE  (
              (start_date<=:end_date
              AND start_date>=:start_date)
            AND 
              (end_date>=:start_date
              AND end_date<=:end_date
              )
              )
        )
        SELECT id,iua_id FROM frameTime`
      ,
      {
        replacements: {
          end_date: model.end_date
          , start_date: model.start_date
          , item_id: model.item_id
          , dim_id: model.dim_id
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });

  }

  searchItemCategoryByValueAndDimQuery({ value, dim_name, transaction }) {
    const project_id = this.context.project && this.context.project.id
    return this.sequelizeDI.sequelize.query(
      `  WITH find_dimension as (
            SELECT DimensionsProjects.id,DimensionsProjects.project_id FROM Dimensions
              JOIN DimensionsProjects ON DimensionsProjects .dimension_id=dimensions.id
              WHERE  name = :dim_name
                ${project_id ? `AND :project_id = DimensionsProjects.project_id ` : ''}
          )
        SELECT ico.* FROM ItemCategoryOptions  ico
        JOIN find_dimension ON ico.dim_id=find_dimension.id
        WHERE ico.value IN (:value)
          `
      ,
      {
        replacements: {
          value: value,
          dim_name: dim_name,
          project_id: project_id
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      });
  }
}
