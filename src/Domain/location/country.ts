
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CountryDBO } from "../../DBO/location";

/**
 * Interface for Country instance
 */
interface CountryInstance extends Model<CountryDBO>, CountryDBO {}

/**
 * Country model initialization
 */
export class Country extends Model<CountryInstance, CountryDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Country> {
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
        status: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        uid: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        name_clob: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        name_clear: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        latitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Countries'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}