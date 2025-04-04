
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { BlobMapperDTO } from "../../../Models/blob";


/**
 * Interface for BlobMapper instance
 */
export interface BlobMapperInstance extends Model<BlobMapperDTO>, BlobMapperDTO {}

/**
 * BlobMapper model initialization
 */
export default class BlobMapper extends Model<BlobMapperInstance, BlobMapperDTO> {
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