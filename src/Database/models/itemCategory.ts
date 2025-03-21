
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for ItemCategory attributes
 */
export interface ItemCategoryDTO {
  id: string;
  item_id?: string;
  category_id?: string;
  is_visible?: number;
}

/**
 * Interface for ItemCategory instance
 */
export interface ItemCategoryInstance extends Model<ItemCategoryDTO>, ItemCategoryDTO {}

/**
 * ItemCategory model initialization
 */
export default class ItemCategory extends Model<ItemCategoryInstance, ItemCategoryDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemCategory> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_visible: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'ItemCategories'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}