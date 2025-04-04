'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserAuthsDTO } from "../../../Models/user/userauth";
/**
 * Interface for UserAuths instance
 */
export interface UserAuthsInstance extends Model<UserAuthsDTO>, UserAuthsDTO {}

/**
 * UserAuths model initialization
 */
export default class UserAuths extends Model<UserAuthsInstance, UserAuthsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<UserAuths> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        socialUser_id: {
          field: 'socialUser_id',
          type: DataTypes.INTEGER,
          allowNull: true
        },
        socialType: {
          field: 'socialType',
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'UserAuths'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}