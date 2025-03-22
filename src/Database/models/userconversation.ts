'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for UserConversation attributes
 */
export interface UserConversationDTO {
  id: string;
  user_id?: string;
  conversation_id?: string;
  project_id?: string;
}

/**
 * Interface for UserConversation instance
 */
export interface UserConversationInstance extends Model<UserConversationDTO>, UserConversationDTO {}

/**
 * UserConversation model initialization
 */
export default class UserConversation extends Model<UserConversationInstance, UserConversationDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<UserConversation> {
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
        conversation_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'UserConversations'
      }
    );
  }

  static associate(models: any) {
    UserConversation.belongsTo(models.V_User, { as: "user_detail", targetKey: 'id', foreignKey: "user_id" });
  }
}