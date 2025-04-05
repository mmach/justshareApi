import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ConfigDBO } from "../../DBO/config";

/**
 * Interface for Config instance
 */
interface ConfigInstance extends Model<ConfigDBO>, ConfigDBO {}

/**
 * Config model initialization
 */
export class Config extends Model<ConfigInstance, ConfigDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Config> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        lang: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Configs'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}