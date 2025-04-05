'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { TagDBO } from "../../DBO/tag";
/**
 * Interface for Tag instance
 */
interface TagInstance extends Model<TagDBO>, TagDBO {}

/**
 * Tag model initialization
 */
export class Tag extends Model<TagInstance, TagDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Tag> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        tag: {
          type: DataTypes.STRING,
          allowNull: false
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Tags'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}