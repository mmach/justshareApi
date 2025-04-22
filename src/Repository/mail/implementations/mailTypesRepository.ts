import { BaseRepositoryType } from "../../../Architecture/index.js";
import { MailTypesDBO } from "../../../DBO/index.js";
import { MailTypes } from "../../../Domain/index.js";
import { IMappsDbModels } from "../../../Domain/models.js";
import { IMailTypesRepository } from "../mailTypesRepository.js";


export default class MailTypesRepository extends BaseRepositoryType<MailTypesDBO, MailTypes> implements IMailTypesRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.MailTypes);
    this.sequelizeDI = sequelizeDI;
  }
  getAll({ transaction }: { transaction?: number }): Promise<MailTypes[]> {
    return this.entityDAO.findAll({
      where: {},
      transaction: this.getTran({ transaction })
    });
  }
}


export const MailTypesRepositoryPlugin = {
  pluginName: "mail-types-repository",
  type: 'repository',
  di: 'mailTypesRepositoryDI',
  classType: MailTypesRepository
};
