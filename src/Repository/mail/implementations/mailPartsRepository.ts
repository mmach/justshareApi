import { BaseRepositoryType } from "../../../Architecture";
import { MailPartsDBO } from "../../../DBO";
import { MailParts } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IMailPartsRepository } from "../mailPartsRepository.js";



export default class MailPartsRepository extends BaseRepositoryType<MailPartsDBO, MailParts> implements IMailPartsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.MailParts);
    this.sequelizeDI = sequelizeDI;
  }

  getAll({ transaction }: { transaction?: number }): Promise<MailParts[]> {
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
      },
      transaction: this.getTran({ transaction })
    });
  }
}



export const MailPartsRepositoryPlugin = {
  pluginName: "mail-parts-repository",
  type: 'repository',
  di: 'mailPartsRepositoryDI',
  classType: MailPartsRepository
};