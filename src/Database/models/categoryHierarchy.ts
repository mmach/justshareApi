
import { Model, ModelStatic, Sequelize, DataTypes, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

/**
 * Interface for CategoryHierarchy attributes
 */
export interface CategoryHierarchyAttributesDTO {
  id: string;
  category_child_id?: string;
  category_parent_id?: string;
}

/**
 * Interface for CategoryHierarchy instance
 */
export interface CategoryHierarchyInstance extends Model<CategoryHierarchyAttributesDTO>, CategoryHierarchyAttributesDTO { }

/**
 * CategoryHierarchy model initialization
 */
export default class CategoryHierarchy extends Model<CategoryHierarchyInstance, CategoryHierarchyAttributesDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<CategoryHierarchy> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        category_child_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        category_parent_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'CategoryHierarchies'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    console.log('categoryhierarchy hooks');

    CategoryHierarchy.afterCreate(async (item: any, options) => {
      console.log('afterCreate');
      console.log(item.dataValues.category_child_id);
      let results = await sequelize.query(
        `
         WITH recus(category_id) AS (
          SELECT category_child_id FROM CategoryHierarchies
          WHERE Category_parent_id IN (:category_id)
          UNION ALL
          SELECT CategoryHierarchies.category_child_id  FROM recus JOIN CategoryHierarchies ON Category_parent_id=recus.category_id
          ),
          union_recus AS (
          SELECT category_id FROM recus
          UNION 
          SELECT :category_id
          )
          SELECT  Items.id, Items.project_id  FROM union_recus 
          JOIN Items ON Items.category_id = union_recus.category_id 
      `,
        {
          replacements: { category_id: item.dataValues.category_child_id },
          transaction: options.transaction,
          type: QueryTypes.SELECT
        }
      );

      console.log(results);
      await Promise.all(results.map((el: any) => {
        return models.EsItemSync.create({
          id: uuidv4(),
          item_id: el.id,
          project_id: el.project_id,
          operation: 'U'
        },
          {
            transaction: options.transaction,
          }
        );
      }));
    });
  }

  static associate(models: any) {
    // Define associations here
    // CategoryHierarchy.belongsTo(models.Category, { as: "category_parent", targetKey: 'id', foreignKey: "category_parent_id" });
    // CategoryHierarchy.belongsTo(models.Category, { as: "category_children", targetKey: 'id', foreignKey: "category_child_id" });
  }
}




