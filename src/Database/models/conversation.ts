
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

/**
 * Interface for Conversation attributes
 */
export interface ConversationDTO {
  id: string;
  user_owner_id?: string;
  title?: string;
  iua_id?: string;
  status?: string;
  project_id?: string;
}

/**
 * Interface for Conversation instance
 */
export interface ConversationInstance extends Model<ConversationDTO>, ConversationDTO {}

/**
 * Conversation model initialization
 */
export default class Conversation extends Model<ConversationInstance, ConversationDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Conversation> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        user_owner_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        status: {
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
        tableName: 'Conversations'
      }
    );
  }

  static associate(models: any) {
    Conversation.hasMany(models.UserConversation, { as: "users",  foreignKey: "conversation_id" });
    Conversation.hasMany(models.ConversationMessages, { as: "messages", foreignKey: "conversation_id" });
    Conversation.hasMany(models.UserConversation, { as: "user_filter",  foreignKey: "conversation_id" });
  }
}