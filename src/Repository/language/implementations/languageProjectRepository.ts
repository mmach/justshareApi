import { BaseRepositoryType } from "../../../Architecture";
import { LanguageProjectDBO } from "../../../DBO";
import { LanguageProject } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ILanguageProjectRepository } from "../languageProjectRepository";


export default class LanguageProjectRepository extends BaseRepositoryType<LanguageProjectDBO, LanguageProject> implements ILanguageProjectRepository {
  sequelizeDI: IMappsDbModels;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.LanguageProject);
    this.sequelizeDI = sequelizeDI;
  }


  async getProjectLanguages({ transaction }: { transaction?: number }): Promise<LanguageProject[]> {
    let where = {
      project_id: this.context.project.id,

    }

    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.Language,
          as: "lang_details",
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }

  async setAsMainLang({ model, transaction }: { model: LanguageProjectDBO, transaction?: number }): Promise<void> {
    let where: Partial<LanguageProjectDBO> = {}
    where.project_id = this.context.project.id
    await this.entityDAO.update({ is_main: false }, {
      where: where,
      transaction: this.getTran({ transaction })
    });
    where.language_id = model.id;
    await this.entityDAO.update({ is_main: true }, {
      where: where,
      transaction: this.getTran({ transaction }),
    });
  }
}


export const LanguageProjectRepositoryPlugin = {
  pluginName: "language-project-repository",
  type: 'repository',
  di: 'languageProjectRepositoryDI',
  classType: LanguageProjectRepository
};