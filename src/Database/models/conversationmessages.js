
"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class ConversationMessages extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof Conversation
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

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

        },
        is_newest: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
      },
      { sequelize ,
        tableName: 'ConversationMessages'
      }
    );
  }

  static hooks(models) {

    ConversationMessages.beforeCreate(async (item, options) => {
      console.log('insert')
      await ConversationMessages.update({ is_newest: false }, {
        where: {
          is_newest: true,
          conversation_id: item.conversation_id,
          project_id: item.project_id
        },
        transaction: options.transaction,
      });

    })
  }

  static associate(models) {
    ConversationMessages.belongsTo(models.V_User, { as: "user_detail", targetKey: 'id', foreignKey: "user_id" });
    ConversationMessages.hasMany(models.ConversationMessageMembers, { as: "users", targetKey: 'id', foreignKey: "message_id" });

    // Conversation.belongsTo(models.CategoryOptionsType, { as: "cat_opt", targetKey: 'id', foreignKey: "cot_id" });
    //Conversation.hasMany(models.CategoryOptionsTemplate, { as: "cat_opt_temp", targetKey: 'co_id', foreignKey: "co_id" });
    //Conversation.hasMany(models.CategoryOptionsLink, { as: "category_link", targetKey: 'co_id', foreignKey: "co_id" });


    /* Item.belongsToMany(models.Category, {
       through: {
         model: models.ItemCategory,
         targetKey: "id",
         foreignKey: "continent_id"
       },
       as: "continents",
       targetKey: "id",
       foreignKey: "item_id"
     });
     
     Item.hasMany(models.Blob, {
       as: "blobs",
       targetKey: "id",
       foreignKey: "item_id"
     });
     //  Item.belongsTo(models.User);
     // Item.hasMany(models.ItemCategory)
     //  Blob.belongsTo(models.User);*/
  }
}
