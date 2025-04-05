
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CategoryOptionsTypeTemplateDBO } from "../../DBO/category";
/**
 * Interface for CategoryOptionsTypeTemplate instance
 */
interface CategoryOptionsTypeTemplateInstance extends Model<CategoryOptionsTypeTemplateDBO>, CategoryOptionsTypeTemplateDBO {}

/**
 * CategoryOptionsTypeTemplate model initialization
 */
export class CategoryOptionsTypeTemplate extends Model<CategoryOptionsTypeTemplateInstance, CategoryOptionsTypeTemplateDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<CategoryOptionsTypeTemplate> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        cot_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_func: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'CategoryOptionsTypeTemplates'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}