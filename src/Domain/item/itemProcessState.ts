
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ItemProcessStateDBO } from "../../DBO/item";

/**
 * Interface for ItemProcessState instance
 */
interface ItemProcessStateInstance extends Model<ItemProcessStateDBO>, ItemProcessStateDBO {}

/**
 * ItemProcessState model initialization
 */
export class ItemProcessState extends Model<ItemProcessStateInstance, ItemProcessStateDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemProcessState> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        item_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        process_chain_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        step_order: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      { 
        sequelize,
        tableName: 'ItemProcessStates'
      }
    );
  }

  static hooks(models: any) {
    // Define hooks here
  }

  static associate(models: any) {
    // Define associations here
  }
}