'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ProjectDTO } from "../../../Models/project";
/**
 * Interface for Project instance
 */
export interface ProjectInstance extends Model<ProjectDTO>, ProjectDTO { }

/**
 * Project model initialization
 */
export default class Project extends Model<ProjectInstance, ProjectDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Project> {
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
        secretKey: {
          type: DataTypes.STRING
        },
        project_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: true
        },
        categories_from_parent: {
          type: DataTypes.BOOLEAN
        },
        theme_color: {
          type: DataTypes.STRING
        },
        root_category_id: {
          type: DataTypes.UUID
        },
        item_to_parent: {
          type: DataTypes.BOOLEAN
        },
        logo_url: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN
        },
        base_url: {
          type: DataTypes.STRING
        },
        contact_mail: {
          type: DataTypes.STRING
        },
        blob_logo_id: {
          type: DataTypes.UUID
        },
        blob_logo_hor_id: {
          type: DataTypes.UUID
        },
        blob_logo_ver_id: {
          type: DataTypes.UUID
        },
        blob_main_id: {
          type: DataTypes.UUID
        },
        description: {
          type: DataTypes.STRING
        },
        user_id: {
          type: DataTypes.UUID
        },
        plan_id: {
          type: DataTypes.UUID
        },
        auth_url: {
          type: DataTypes.STRING
        },
        blob_main_phone_id: {
          type: DataTypes.UUID
        },
        salt: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize,
        tableName: 'Projects'
      }
    );
  }

  static associate(models: any) {
    Project.belongsTo(models.Blob, {
      as: "logo",
      targetKey: "id",
      foreignKey: "blob_logo_id"
    });
    Project.belongsTo(models.Blob, {
      as: "logo_hor",
      targetKey: "id",
      foreignKey: "blob_logo_hor_id"
    });
    Project.belongsTo(models.Blob, {
      as: "img_main_phone",
      targetKey: "id",
      foreignKey: "blob_main_phone_id"
    });
    Project.belongsTo(models.Blob, {
      as: "logo_ver",
      targetKey: "id",
      foreignKey: "blob_logo_ver_id"
    });
    Project.belongsTo(models.Blob, {
      as: "img_main",
      targetKey: "id",
      foreignKey: "blob_main_id"
    });
    Project.hasMany(models.V_User, {
      as: "users",
      foreignKey: "project_id"
    });
  }
}