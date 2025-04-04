
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ConversationMessagesDTO } from "../../../Models/conversation/conversationMessages";
/**
 * Interface for ConversationMessages instance
 */
export interface ConversationMessagesInstance extends Model<ConversationMessagesDTO>, ConversationMessagesDTO { }

/**
 * ConversationMessages model initialization
 */
export default class ConversationMessages extends Model<ConversationMessagesInstance, ConversationMessagesDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ConversationMessages> {
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
        message_triggered_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        conversation_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_newest: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'ConversationMessages'
      }
    );
  }

  static hooks(models: any) {
    ConversationMessages.beforeCreate(async (item: any, options) => {
      console.log('insert');
      await ConversationMessages.update({ is_newest: false }, {
        where: {
          is_newest: true,
          conversation_id: item.conversation_id,
          project_id: item.project_id
        },
        transaction: options.transaction,
      });
    });
  }

  static associate(models: any) {
    ConversationMessages.belongsTo(models.V_User, { as: "user_detail", targetKey: 'id', foreignKey: "user_id" });
    ConversationMessages.hasMany(models.ConversationMessageMembers, { as: "users", foreignKey: "message_id" });
  }
}