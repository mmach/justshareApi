import { BaseRepositoryType } from "../../../Architecture";
import { UserInvoiceValueDBO } from "../../../DBO";
import { UserInvoiceValue } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IUserInvoiceValuesRepository } from "../userInvoiceValuesRepository";

export default class UserInvoiceValuesRepository extends BaseRepositoryType<UserInvoiceValueDBO, UserInvoiceValue> implements IUserInvoiceValuesRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.UserInvoiceValue);
    this.sequelizeDI = sequelizeDI;
  }

  getUserInvoiceData({ user_id ,transaction}: { user_id: number, transaction?: number }): Promise<UserInvoiceValue | null> {
    return this.entityDAO.findOne({
      where:
      {
        project_id: this.context.project.id,
      },
      include: [
        {
          model: this.sequelizeDI.Users,
          as: "user",
          required: true,
          where: {
            id: user_id
          }
        },
      ],
      transaction: this.getTran({ transaction })
    });
  }
}

export const UserInvoiceValuesRepositoryPlugin = {
  pluginName: "user-invoice-values-repository",
  type: 'repository',
  di: 'userInvoiceValuesRepositoryDI',
  classType: UserInvoiceValuesRepository
};
