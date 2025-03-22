
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for ItemTag attributes
 */
export interface ItemTagDTO {
  id: string;
  tag_id?: string;
  item_id?: string;
}

/**
 * Interface for ItemTag instance
 */
export interface ItemTagInstance extends Model<ItemTagDTO>, ItemTagDTO {}

/**
 * ItemTag model initialization
 */
export default class ItemTag extends Model<ItemTagInstance, ItemTagDTO> {
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