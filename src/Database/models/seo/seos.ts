'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Seos attributes
 */
export interface SeosDTO {
  id: string;
  project_id?: string;
  fb_app_id?: string;
  fb_type?: string;
  fb_title?: string;
  fb_image?: string;
  fb_description?: string;
  fb_site_name?: string;
  fb_url?: string;
  sitemap_gen?: string;
  sitemap_add_json?: string;
}

/**
 * Interface for Seos instance
 */
export interface SeosInstance extends Model<SeosDTO>, SeosDTO {}

/**
 * Seos model initialization
 */
export default class Seos extends Model<SeosInstance, SeosDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Seos> {
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
          allowNull: true
        },
        fb_app_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        fb_type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        fb_title: {
          type: DataTypes.STRING,
          allowNull: true
        },
        fb_image: {
          type: DataTypes.STRING,
          allowNull: true
        },
        fb_description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        fb_site_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        fb_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sitemap_gen: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sitemap_add_json: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Seos'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}