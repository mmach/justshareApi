
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ItemCategoryDBO } from "../../DBO/item";

/**
 * Interface for ItemCategory instance
 */
interface ItemCategoryInstance extends Model<ItemCategoryDBO>, ItemCategoryDBO {}

/**
 * ItemCategory model initialization
 */
export class ItemCategory extends Model<ItemCategoryInstance, ItemCategoryDBO> {
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