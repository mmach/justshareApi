import { Sequelize } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { ConfigDBO } from "../../../DBO";
import { IMappsDbModels } from "../../../Domain/models";
import { ICmsMenuItemsPrivilegesProjectRepository } from "../../cms";
import { Config } from "../../../Domain";

export default class ConfigRepository extends BaseRepositoryType<ConfigDBO, Config> implements ICmsMenuItemsPrivilegesProjectRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Config);
    this.sequelizeDI = sequelizeDI;
  }


  getByName({ type, lang, transaction }: { type: string, lang?: string, transaction?: number }) {
    let where: { type: string, project_id: string, lang?: string } = {
      type: type,
      project_id: this.context.project.id
    };
    if (lang) {
      where.lang = lang;
    }

    return this.entityDAO.findOne({
      where: where
      ,
      transaction: this.getTran({ transaction })
    })
  }
  getByNames({ types, lang, transaction }: { types: string[], lang?: string, transaction?: number }) {


    return this.entityDAO.findAll({
      where: {
        type: types as any,
        project_id: this.context.project.id,
        lang: this.sequelizeDI.sequelize.literal(`lang IS NULL OR lang ='${String(lang).replace(`'`, '')}'`)
      }
      ,
      transaction: this.getTran({ transaction })
    })
  }
}


export const ConfigRepositoryPlugin = {
  pluginName: "config-repository",
  type: 'repository',
  di: 'configRepositoryDI',
  classType: ConfigRepository
};