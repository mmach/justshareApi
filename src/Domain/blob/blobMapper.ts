
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { BlobMapperDBO } from "../../DBO/blob";


/**
 * Interface for BlobMapper instance
 */
interface BlobMapperInstance extends Model<BlobMapperDBO>, BlobMapperDBO {}

/**
 * BlobMapper model initialization
 */
export class BlobMapper extends Model<BlobMapperInstance, BlobMapperDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<BlobMapper> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        }
      },
      { 
        sequelize,
        tableName: 'BlobMappers'
      }
    );
  }

  static associate(models: any) {
    // BlobMapper.belongsTo(models.Blobs, { foreignKey: "blob_thumbmail_id" });
    // BlobMapper.belongsTo(models.Blobs, { foreignKey: "blob_id" });
  }
}