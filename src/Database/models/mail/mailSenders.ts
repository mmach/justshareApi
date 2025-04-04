'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { MailSendersDTO } from "../../../Models/mail";
/**
 * Interface for MailSenders instance
 */
export interface MailSendersInstance extends Model<MailSendersDTO>, MailSendersDTO { }

/**
 * MailSenders model initialization
 */
export default class MailSenders extends Model<MailSendersInstance, MailSendersDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<MailSenders> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sendgrid_key: {
          type: DataTypes.STRING,
          allowNull: true
        },
        smtp_host: {
          type: DataTypes.STRING,
          allowNull: true
        },
        smtp_port: {
          type: DataTypes.STRING,
          allowNull: true
        },
        smtp_security: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'MailSenders'
      }
    );
  }

  static associate(models: any) {
    MailSenders.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }

  static hooks(models: any) {
    MailSenders.afterDestroy(async (item: any, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}