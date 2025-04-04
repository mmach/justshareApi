'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { TagDTO } from "../../../Models/tag";
/**
 * Interface for Tag instance
 */
export interface TagInstance extends Model<TagDTO>, TagDTO {}

/**
 * Tag model initialization
 */
export default class Tag extends Model<TagInstance, TagDTO> {
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