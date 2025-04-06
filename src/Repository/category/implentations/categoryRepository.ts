import { ModelStatic, QueryTypes, Sequelize } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import PrepareSearch from "../../../Architecture/prepareSearch";
import { CategoryActionsDBO, CategoryDBO, V_CategoryDBO } from "../../../DBO";
import { Category, CategoryActions, V_Category } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models.js";
import { ICategoryRepository } from "../categoryRepository";


export default class CategoryRepository extends BaseRepositoryType<CategoryDBO, Category> implements ICategoryRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  CategoryVDB: ModelStatic<V_Category>
  CategoryActionsDB: ModelStatic<CategoryActions>
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Category);
    this.CategoryVDB = sequelizeDI.V_Category;
    this.CategoryActionsDB = sequelizeDI.CategoryActions;

    this.sequelizeDI = sequelizeDI;
  }


  deleteAction({ model, transaction }: { model: CategoryActionsDBO, transaction?: number }): Promise<number> {
    let where = { id: this.toStr(model.id) }
    return this.CategoryActionsDB.destroy({
      where: where,
      transaction: this.getTran({ transaction })
    });
  }

  insertAction({ model, transaction }: { model: CategoryActionsDBO, transaction?: number }): Promise<CategoryActions> {
    let item = model;

    return this.CategoryActionsDB.create(item, {
      transaction: this.getTran({ transaction }),
      returning: true,
      individualHooks: true,
      plain: true
    });
  }

  getAllCategoriesFlat({ model, transaction }: { model: CategoryDBO, transaction?: number }): Promise<object[]> {
    return this.sequelizeDI.sequelize.query(
      `
      SELECT
       V_Categories.id  as category_child_id,
        category_parent_id,category as title,
        V_Categories.*
      FROM V_Categories LEFT  JOIN CategoryHierarchies ON V_Categories.id = CategoryHierarchies.category_child_id
      WHERE status=ISNULL(NULLIF(:status,0),status)
      AND project_id=:project_id
       order by category  
      `,
      {
        replacements: { status: model.status, project_id: this.context.project.id },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    );
  }
  updateIcon({ category_id, old_icon_id, new_icon_id, transaction }: { category_id: string, old_icon_id: string, new_icon_id: string, transaction?: number }): Promise<[affectedCount: number]> | undefined {
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

  getAllActions({ ids, transaction }: { ids: string[], transaction?: number }): Promise<CategoryActions[]> {
    return this.CategoryActionsDB.findAll({
      where: {
        category_id: ids
      },
      transaction: this.getTran({ transaction })

    })
  }

  getCategoryTree({ ids, parent, transaction }: { ids: string[], parent?: string, transaction?: number }): Promise<V_Category[]> {
    let where: { id?: string[], project_id: string, category?: string, status?: number } = { id: ids, project_id: this.context.project.id };

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
    return this.CategoryVDB.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.V_Category,
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
          model: this.sequelizeDI.Translations,
          as: "translation"
        },
        {
          model: this.sequelizeDI.V_Category,
          as: "category_parent",
          where: parentWhere,
          include: [
            {
              model: this.sequelizeDI.V_Category,
              as: "category_parent",
              required: false,
              include: [

                {
                  model: this.sequelizeDI.Blob,
                  as: "icon_blob"

                },
                {
                  model: this.sequelizeDI.Translations,
                  as: "translation"
                },
              ]
            },
            {
              model: this.sequelizeDI.Blob,
              as: "icon_blob"
            },
            {
              model: this.sequelizeDI.Translations,
              as: "translation"
            },

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

  removeCategory({ id, transaction }: { id: string, transaction?: number }): Promise<number> {
    return this.entityDAO.destroy({
      where: { id: id, project_id: this.context.project.id },
      transaction: this.getTran({ transaction }),
      individualHooks: true

    });
  }

  setAsVerified({ id, status, transaction }: { id: string, status: number, transaction?: number }): Promise<[affectedCount: number]> {
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

  getCategoryRelated({ id, transaction }: { id: string, transaction?: number }): Promise<V_CategoryDBO[]> {
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
          SELECT  id,category,category_pl,category_us FROM union_recus JOIN V_Categories ON Id = category_id
          GROUP BY id,category,category_pl,category_us
        
    `,
      {
        replacements: { id: id, project_id: this.context.project.id },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      }
    );


  }

  getCategoriesParents({ ids, transaction }: { ids: string[], transaction?: number }): Promise<V_CategoryDBO[]> {

    let replacements: { id: string[], project_id?: string } = { id: ids };
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
          FROM union_recus JOIN V_Categories ON Id = category_id
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
        type: QueryTypes.SELECT
      }
    );
  }

  getCategoryFreetext({ search, transaction }: { search: string, transaction?: number }): Promise<object[]> {
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
        type: QueryTypes.SELECT
      }
    );


  }
}

export const CategoryRepositoryPlugin = {
  pluginName: "category-repository",
  type: 'repository',
  di: 'categoryRepositoryDI',
  classType: CategoryRepository
};