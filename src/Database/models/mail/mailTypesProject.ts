'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { TranslationsDTO } from "../translations/translations";
import { MailPartsDTO } from "./mailParts";
import { MailSendersDTO } from "./mailSenders";
import { MailTypesDTO } from "./mailTypes";

/**
 * Interface for MailTypesProjects attributes
 */
export interface MailTypesProjectsDTO {
  id: string;
  translation_id?: string;
  mailsender_id?: string;
  mail_body_id?: string;
  mail_template_id?: string;
  mailtype_id?: string;
  project_id?: string;

  translation?: TranslationsDTO;
  mailsender?: MailSendersDTO;
  body?: MailPartsDTO;
  template?: MailPartsDTO;
  mailtype?: MailTypesDTO;
}

/**
 * Interface for MailTypesProjects instance
 */
export interface MailTypesProjectsInstance extends Model<MailTypesProjectsDTO>, MailTypesProjectsDTO {}

/**
 * MailTypesProjects model initialization
 */
export default class MailTypesProjects extends Model<MailTypesProjectsInstance, MailTypesProjectsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<MailTypesProjects> {
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
        mailsender_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        mail_body_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        mail_template_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        mailtype_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'MailTypesProjects'
      }
    );
  }

  static associate(models: any) {
    MailTypesProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
    MailTypesProjects.belongsTo(models.MailSenders, { as: "mailsender", targetKey: 'id', foreignKey: "mailsender_id" });
    MailTypesProjects.belongsTo(models.MailParts, { as: "body", targetKey: 'id', foreignKey: "mail_body_id" });
    MailTypesProjects.belongsTo(models.MailParts, { as: "template", targetKey: 'id', foreignKey: "mail_template_id" });
    MailTypesProjects.belongsTo(models.MailTypes, { as: "mailtype", targetKey: 'id', foreignKey: "mailtype_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    MailTypesProjects.afterDestroy(async (item:any, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}