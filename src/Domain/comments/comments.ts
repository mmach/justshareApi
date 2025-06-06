
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CommentDBO } from "../../DBO/comments";
/**
 * Interface for Comment instance
 */
interface CommentInstance extends Model<CommentDBO>, CommentDBO {}

/**
 * Comment model initialization
 */
export class Comment extends Model<CommentInstance, CommentDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Comment> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        user_src_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        rate: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        action_id: {
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
        tableName: 'Comments'
      }
    );
  }

  static hooks(models: any) {
    // Define hooks here
  }

  static associate(models: any) {
    // Define associations here
  }
}