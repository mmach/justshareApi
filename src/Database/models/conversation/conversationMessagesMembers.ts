'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ConversationMessageMembersDTO } from "../../../Models/conversation";

/**
 * Interface for ConversationMessageMembers instance
 */
export interface ConversationMessageMembersInstance extends Model<ConversationMessageMembersDTO>, ConversationMessageMembersDTO {}

/**
 * ConversationMessageMembers model initialization
 */
export default class ConversationMessageMembers extends Model<ConversationMessageMembersInstance, ConversationMessageMembersDTO> {
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