
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for CategoryOptionsTypeTemplate attributes
 */
export interface CategoryOptionsTypeTemplateDTO {
  id: string;
  cot_id?: string;
  type?: string;
  status?: boolean;
  order?: number;
  is_func?: boolean;
}

/**
 * Interface for CategoryOptionsTypeTemplate instance
 */
export interface CategoryOptionsTypeTemplateInstance extends Model<CategoryOptionsTypeTemplateDTO>, CategoryOptionsTypeTemplateDTO {}

/**
 * CategoryOptionsTypeTemplate model initialization
 */
export default class CategoryOptionsTypeTemplate extends Model<CategoryOptionsTypeTemplateInstance, CategoryOptionsTypeTemplateDTO> {
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