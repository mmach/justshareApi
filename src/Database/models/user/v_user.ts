'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { BlobDTO } from "../blob/blob";
import { vProjectDTO } from "../project/v_project";
import { UserRolesDTO } from "./userRoles";
import { UserTypesDTO } from "./userTypes";

/**
 * Interface for vUser attributes
 */
export interface vUserDTO {
  id: string;
  name?: string;
  nickname?: string;
  surname?: string;
  email?: string;
  phone?: string;
  birthDate?: Date;
  longitude?: number;
  latitude?: number;
  relogin_require?: boolean;
  language?: string;
  blob_id?: string;
  is_admin?: boolean;
  is_root?: boolean;
  zipcode?: string;
  address?: string;
  city_id?: string;
  country_id?: string;
  city?: string;
  project_id?: string;
  usertype_id?: string;
  user_invoice_data_id?: string;

  blob_profile?: BlobDTO;
  user_type?: UserTypesDTO;
  user_roles?: UserRolesDTO[];
  project?: vProjectDTO;
}

/**
 * Interface for vUser instance
 */
export interface vUserInstance extends Model<vUserDTO>, vUserDTO { }

/**
 * vUser model initialization
 */
export default class vUser extends Model<vUserInstance, vUserDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<vUser> {
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
          allowNull: false
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        relogin_require: DataTypes.BOOLEAN,
        language: DataTypes.STRING,
        blob_id: DataTypes.UUID,
        is_admin: DataTypes.BOOLEAN,
        is_root: DataTypes.BOOLEAN,
        zipcode: DataTypes.STRING,
        address: DataTypes.STRING,
        city_id: DataTypes.UUID,
        country_id: DataTypes.UUID,
        city: DataTypes.STRING,
        project_id: DataTypes.UUID,
        usertype_id: DataTypes.UUID,
        user_invoice_data_id: DataTypes.UUID
      },
      {
        sequelize,
        tableName: 'V_Users'
      }
    );
  }

  static associate(models: any) {
    vUser.belongsTo(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });
    vUser.belongsTo(models.UserTypes, { as: "user_type", targetKey: 'id', foreignKey: "usertype_id" });
    vUser.hasMany(models.UserRoles, { as: "user_roles", foreignKey: "user_id" });
    vUser.belongsTo(models.V_Project, { as: "project", targetKey: 'id', foreignKey: "project_id" });
  }
}