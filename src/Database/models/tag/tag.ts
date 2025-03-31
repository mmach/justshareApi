'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Tag attributes
 */
export interface TagDTO {
  id: string;
  tag?: string;
  project_id?: string;
}

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