
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ConversationDBO } from "../../DBO/conversation";
/**
 * Interface for Conversation instance
 */
interface ConversationInstance extends Model<ConversationDBO>, ConversationDBO {}

/**
 * Conversation model initialization
 */
export class Conversation extends Model<ConversationInstance, ConversationDBO> {
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