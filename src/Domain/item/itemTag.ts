
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ItemTagDBO } from "../../DBO/item";

/**
 * Interface for ItemTag instance
 */
interface ItemTagInstance extends Model<ItemTagDBO>, ItemTagDBO {}

/**
 * ItemTag model initialization
 */
export class ItemTag extends Model<ItemTagInstance, ItemTagDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemTag> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        tag_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: false
        }
      },
      { 
        sequelize,
        tableName: 'ItemTags'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}