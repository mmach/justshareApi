
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for CategoryOptionsType attributes
 */
export interface CategoryOptionsTypeAttributesDTO {
  id: string;
  name?: string;
  type?: string;
  status?: boolean;
  is_strict?: boolean;
}

/**
 * Interface for CategoryOptionsType instance
 */
export interface CategoryOptionsTypeInstance extends Model<CategoryOptionsTypeAttributesDTO>, CategoryOptionsTypeAttributesDTO {}

/**
 * CategoryOptionsType model initialization
 */
export default class CategoryOptionsType extends Model<CategoryOptionsTypeInstance, CategoryOptionsTypeAttributesDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<CategoryOptionsType> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        name: {
          type: DataTypes.STRING,
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
        is_strict: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'CategoryOptionsTypes'
      }
    );
  }

  static associate(models: any) {
    CategoryOptionsType.hasMany(models.CategoryOptionsTypeTemplate, {
      as: "cat_options_type_temp",
      foreignKey: "cot_id"
    });
  }
}