'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ConversationMessageMembersDBO } from "../../DBO/conversation";

/**
 * Interface for ConversationMessageMembers instance
 */
interface ConversationMessageMembersInstance extends Model<ConversationMessageMembersDBO>, ConversationMessageMembersDBO {}

/**
 * ConversationMessageMembers model initialization
 */
export class ConversationMessageMembers extends Model<ConversationMessageMembersInstance, ConversationMessageMembersDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<ConversationMessageMembers> {
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
        message_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'ConversationMessageMembers'
      }
    );
  }

  static associate(models: any) {
 
  }
}