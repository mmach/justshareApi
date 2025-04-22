import { BaseRepositoryType } from "../../../Architecture";
import { MailSendersDBO } from "../../../DBO";
import { MailSenders } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IMailSendersRepository } from "../mailSendersRepository";


export default class MailSendersRepository extends BaseRepositoryType<MailSendersDBO, MailSenders> implements IMailSendersRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.MailSenders);
    this.sequelizeDI = sequelizeDI;
  }

  getAll({ transaction }: { transaction?: number }): Promise<MailSenders[]> {
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
      ],
      transaction: this.getTran({ transaction })
    });
  }
}

export const MailSendersRepositoryPlugin = {
  pluginName: "mail-senders-repository",
  type: 'repository',
  di: 'mailSendersRepositoryDI',
  classType: MailSendersRepository
};