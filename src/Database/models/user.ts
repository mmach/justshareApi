'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Users attributes
 */
export interface UsersDTO {
  id: string;
  name?: string;
  surname?: string;
  nickname?: string;
  email?: string;
  salt?: string;
  phone?: string;
  birthDate?: Date;
  uid?: string;
  is_authorized?: boolean;
  passwordHash?: string;
  longitude?: number;
  latitude?: number;
  relogin_require?: boolean;
  refresh_token?: string;
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
}

/**
 * Interface for Users instance
 */
export interface UsersInstance extends Model<UsersDTO>, UsersDTO { }

/**
 * Users model initialization
 */
export default class Users extends Model<UsersInstance, UsersDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Users> {
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
        surname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        salt: {
          type: DataTypes.STRING,
          allowNull: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        uid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        is_authorized: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: true
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        latitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        relogin_require: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        refresh_token: {
          type: DataTypes.UUID,
          allowNull: true
        },
        language: {
          type: DataTypes.STRING,
          allowNull: true
        },
        blob_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_admin: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_root: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        zipcode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true
        },
        city_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        country_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        usertype_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        user_invoice_data_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Users'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    Users.beforeDestroy(async (item: any, options) => {
      console.log('beforeDestroyUser');

      await models.Item.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.Blob.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.UserTypesUser.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.UserAuths.destroy({
        where: { user_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      /* await models.UserConversations.destroy({
         where: { user_id: item.id },
         transaction: options.transaction,
         individualHooks: true
       }) */
    });
  }

  static associate(models: any) {
    Users.belongsTo(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });
    Users.hasMany(models.UserAuths, { as: "user_auths", foreignKey: "user_id" });
    Users.belongsTo(models.UserTypes, { as: "user_type", targetKey: 'id', foreignKey: "usertype_id" });
    Users.hasMany(models.UserRoles, { as: "user_roles", foreignKey: "user_id" });
  }
}