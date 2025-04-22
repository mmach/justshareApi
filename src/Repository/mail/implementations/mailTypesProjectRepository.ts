import { BaseRepositoryType } from "../../../Architecture";
import { MailTypesProjectsDBO, MailTypesDBO } from "../../../DBO";
import { MailTypesProjects } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IMailTypesProjectRepository } from "../mailTypesProjectRepository";

export default class MailTypesProjectRepository extends BaseRepositoryType<MailTypesProjectsDBO, MailTypesProjects> implements IMailTypesProjectRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.MailTypesProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getAll({ model, transaction }: { model?: { mailtype: string }, transaction?: number }): Promise<MailTypesProjects[]> {
    let typeWhere: Partial<MailTypesDBO> = {}
    if (model && model.mailtype) {
      typeWhere.token = model.mailtype
    }
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.Translations,
          as: "translation"

        },
        {
          model: this.sequelizeDI.MailParts,
          as: "body"

        }, {
          model: this.sequelizeDI.MailParts,
          as: "template"

        },
        {
          model: this.sequelizeDI.MailSenders,
          as: "mailsender",

          include: [
            {
              model: this.sequelizeDI.Translations,
              as: "translation"

            },
          ]
        },
        {
          model: this.sequelizeDI.MailTypes,
          as: "mailtype",
          where: typeWhere

        },
      ],

      transaction: this.getTran({ transaction })
    });
  }
}


export const MailTypesProjectRepositoryPlugin = {
  pluginName: "mail-types-project-repository",
  type: 'repository',
  di: 'mailTypesProjectRepositoryDI',
  classType: MailTypesProjectRepository
};
