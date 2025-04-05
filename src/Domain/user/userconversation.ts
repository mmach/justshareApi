'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserConversationDBO } from "../../DBO/user";

/**
 * Interface for UserConversation instance
 */
interface UserConversationInstance extends Model<UserConversationDBO>, UserConversationDBO {}

/**
 * UserConversation model initialization
 */
export class UserConversation extends Model<UserConversationInstance, UserConversationDBO> {
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