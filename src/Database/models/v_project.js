"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class vProject extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Country|Model}
   * @memberof Project
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
        name: {
          type: DataTypes.STRING,
          allowNull: true
        },

      
        project_id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.UUIDV4,
          allowNull: true

        }
        , categories_from_parent: {
          type: DataTypes.BOOLEAN
        }
        , theme_color: {
          type: DataTypes.STRING
        }
        , root_category_id: {
          type: DataTypes.UUID
        }
        , item_to_parent: {
          type: DataTypes.BOOLEAN
        }
        , logo_url: {
          type: DataTypes.STRING
        }
        , status: {
          type: DataTypes.BOOLEAN
        }
        , base_url: {
          type: DataTypes.STRING
        }
        , contact_mail: {
          type: DataTypes.STRING
        }
        , blob_logo_id: {
          type: DataTypes.UUID
        }
        , blob_logo_hor_id: {
          type: DataTypes.UUID
        }
        , blob_logo_ver_id: {
          type: DataTypes.UUID
        }
        , blob_main_id: {
          type: DataTypes.UUID
        }
        , description: {
          type: DataTypes.STRING
        }
        , user_id: {
          type: DataTypes.UUID
        }
        , plan_id: {
          type: DataTypes.UUID
        }
        , auth_url: {
          type: DataTypes.STRING
        }
        , blob_main_phone_id: {
          type: DataTypes.UUID
        }
      
        
      },
      { sequelize }
    );
  }
  static associate(models) {
    vProject.belongsTo(models.Blob, {
      as: "logo",
      targetKey: "id",
      foreignKey: "blob_logo_id"
    });
    vProject.belongsTo(models.Blob, {
      as: "logo_hor",
      targetKey: "id",
      foreignKey: "blob_logo_hor_id"
    });
    vProject.belongsTo(models.Blob, {
      as: "logo_ver",
      targetKey: "id",
      foreignKey: "blob_logo_ver_id"
    });
    vProject.belongsTo(models.Blob, {
      as: "img_main",
      targetKey: "id",
      foreignKey: "blob_main_id"
    });
    vProject.belongsTo(models.Blob, {
      as: "img_main_phone",
      targetKey: "id",
      foreignKey: "blob_main_phone_id"
    });
    vProject.belongsTo(models.V_User, {
      as: "owner",
      targetKey: "id",
      foreignKey: "user_id"
    });
    vProject.hasMany(models.V_User, {
      as: "users",
      targetKey: "id",
      foreignKey: "project_id"
    });
  }
}

/*


module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clobSearch: DataTypes.TEXT,
    clobSearch_pl: DataTypes.TEXT,
    clobSearch_us: DataTypes.TEXT
  }, {underscored: true});
  Item.associate = function(models) {
    Item.belongsTo(models.User);
    Item.hasMany(models.ItemCategory)
    // associations can be defined here
  };
  return Item;
};*/
