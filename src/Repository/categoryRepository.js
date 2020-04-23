import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import PrepareSearch from "../Architecture/prepareSearch.js";

/**
 *
 * @export
 * @class CategoryRepository
 * @extends BaseRepository
 */
export default class CategoryRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CategoryRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Category);
    this.sequelizeDI = sequelizeDI;
  }
  getAllCategoriesFlat({ model, transaction }) {
    return this.sequelizeDI.sequelize.query(
      `
      SELECT
       Categories.id  as category_child_id,
        category_parent_id,category as title,
        Categories.*
      FROM Categories LEFT  JOIN CategoryHierarchies ON Categories.id = CategoryHierarchies.category_child_id
      WHERE status=ISNULL(NULLIF(:status,0),status)
      AND project_id=:project_id
       order by category  
      `,
      {
        replacements: { status: model.status, project_id: this.context.project.id },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );
  }
  updateIcon({ category_id, old_icon_id, new_icon_id, transaction }) {
    let where = {}
    if (old_icon_id) {
      where = { blob_id: old_icon_id }

    } else if (category_id) {
      where = { id: this.toStr(category_id) }

    } else {
      return
    }

    return this.entityDAO.update(
      {
        blob_id: this.toStr(new_icon_id)
      },
      {
        where: where,
        transaction: this.getTran({ transaction })
      }
    );

  }
  /**
   *
   *
   * @param {Array} {id}
   * @memberof CategoryRepository
   */
  getCategoryTree({ ids, parent, transaction }) {
    let where = { id: ids, project_id: this.context.project.id };

    if (ids[0] == '_ROOT') {
      where = { category: "_ROOT", project_id: this.context.project.id }
    }
    let parentWhere = undefined
    if (parent != undefined) {
      where = { status: 1, project_id: this.context.project.id }
      if (parent == '_ROOT') {
        parentWhere = { category: '_ROOT', project_id: this.context.project.id }
      } else {
        parentWhere = { id: parent, project_id: this.context.project.id }
      }

    }
    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.Category,
          as: "category_children"
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },
        {
          model: this.sequelizeDI.Blob,
          as: "icon_blob"
        },
        {
          model: this.sequelizeDI.Category,
          as: "category_parent",
          where: parentWhere,
          include: [
            {
              model: this.sequelizeDI.Category,
              as: "category_parent",
              required: false,
              include: [

                {
                  model: this.sequelizeDI.Blob,
                  as: "icon_blob"

                }
              ]
            },
            {
              model: this.sequelizeDI.Blob,
              as: "icon_blob"
            }

          ]
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_parent"
           }
           ]*/
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
  removeCategory({ id, transaction }) {
    return this.entityDAO.destroy({
      where: { id: id, project_id: this.context.project.id },
      transaction: this.getTran({ transaction }),
      individualHooks: true

    });
  }

  setAsVerified({ id, status, transaction }) {
    return this.entityDAO.update(
      {
        status: this.toStr(status)
      },
      {
        where: { id: this.toStr(id), project_id: this.context.project.id },
        transaction: this.getTran({ transaction })
      }
    );
  }

  getCategoryRelated({ id, transaction }) {
    return this.sequelizeDI.sequelize.query(
      `
     
       WITH recus(category_id) AS (
        SELECT category_child_id FROM CategoryHierarchies
        WHERE Category_parent_id IN (:id)
        UNION ALL
        SELECT CategoryHierarchies.category_child_id  FROM recus JOIN CategoryHierarchies ON Category_parent_id=recus.category_id
        ),
        union_recus AS (
        SELECT category_id FROM recus
        UNION ALL
        SELECT :id
        )
          SELECT  id,category,category_pl,category_us FROM union_recus JOIN Categories ON Id = category_id
          GROUP BY id,category,category_pl,category_us
        
    `,
      {
        replacements: { id: id, project_id: this.context.project.id },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );


  }



  getCategoriesParents({ ids, transaction }) {

    let replacements = { id: ids };
    if (!this.context.project.allowForAll) {
      replacements.project_id = this.context.project.id
    }
    return this.sequelizeDI.sequelize.query(
      `
      WITH recus(category_id) AS (
        SELECT category_child_id FROM CategoryHierarchies
        WHERE category_child_id IN (:id)
        UNION ALL
        SELECT CategoryHierarchies.Category_parent_id  FROM recus JOIN CategoryHierarchies ON category_child_id=recus.category_id
        ),
        union_recus AS (
        SELECT category_id FROM recus
        UNION ALL
        SELECT :id
        )
          SELECT  id,category,
          category_pl,
          category_us   
          ,[category_de]
          ,[category_ru]
          ,[category_fr]
          ,[category_es]
          ,[category_no]
          ,[category_zh_cn]
          ,[expired_day]
          FROM union_recus JOIN Categories ON Id = category_id
          WHERE ${!this.context.project.allowForAll ? 'project_id=:project_id' : '1=1'}
          GROUP BY id,category,category_pl,category_us,  [category_de]
          ,[category_ru]
          ,[category_fr]
          ,[category_es]
          ,[category_no]
          ,[category_zh_cn]
          ,[expired_day]
        
    `,
      {
        replacements: replacements,
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );


  }
  getCategoryFreetext({ search, isFor, transaction }) {
    let lang = undefined;
    let freetext = PrepareSearch.prepareSmall(search)
    freetext = freetext != undefined ? freetext : '""';
    switch (this.context.language) {
      case 'pl': lang = 'polish'
      case 'us': lang = 'english'
      case 'de': lang = '1031'
      case 'ru': lang = '1049'
      case 'fr': lang = '1036'
      case 'es': lang = '3082'
      case 'no': lang = '1044'
      case 'zh_cn': lang = '2052'
      default:
        break;
    }
    if (!lang) {
      throw 'UNAUTHORIZED_LANGUAGE'
    }
    return this.sequelizeDI.sequelize.query(
      `
  
        SELECT t.* FROM (SELECT 
          [KEY],
          ([RANK])*100/(1+CAST( SUM([RANK]) OVER( PARTITION BY 1) AS FLOAT)) AS [RANK]
          FROM 
          CONTAINSTABLE (V_Categories_FT,  
            ${'category_' + this.context.language}, 
            :freetext,
            LANGUAGE ${lang}
          --	20  
          )  ) as t
          WHERE RANK > 0 
          
      `,
      {
        replacements: { freetext: freetext },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );


  }
}
