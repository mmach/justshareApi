
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { EsItemSyncDBO } from "../../DBO/sync/esItemSync";

/**
 * Interface for EsItemSync instance
 */
interface EsItemSyncInstance extends Model<EsItemSyncDBO>, EsItemSyncDBO {}

/**
 * EsItemSync model initialization
 */
export class EsItemSync extends Model<EsItemSyncInstance, EsItemSyncDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<EsItemSync> {
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
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        operation: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'EsItemSyncs'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}