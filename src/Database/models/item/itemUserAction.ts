'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ItemUserActionDTO } from "../../../Models/item";
/**
 * Interface for ItemUserAction instance
 */
export interface ItemUserActionInstance extends Model<ItemUserActionDTO>, ItemUserActionDTO {}

/**
 * ItemUserAction model initialization
 */
export default class ItemUserAction extends Model<ItemUserActionInstance, ItemUserActionDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemUserAction> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        action_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        iua_prev_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        uniq_number: {
          type: DataTypes.STRING,
          allowNull: true
        },
        created_date: {
          type: DataTypes.DATE,
          allowNull: true
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_chain_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        parent_process_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        parent_process_chain_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        parent_iua_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        destination_date: {
          type: DataTypes.DATE,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'ItemUserActions'
      }
    );
  }

  static associate(models: any) {
    ItemUserAction.hasOne(models.Conversation, {
      as: "conversation",
      foreignKey: "iua_id"
    });
    ItemUserAction.belongsTo(models.V_User, {
      as: "users",
      targetKey: "id",
      foreignKey: "user_id"
    });
  }
}