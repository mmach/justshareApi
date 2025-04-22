import { BaseRepositoryType } from "../../../Architecture";
import { UserTypesDBO } from "../../../DBO";
import { UserTypes } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IUserTypesRepository } from "../userTypesRepository";

export default class UserTypesRepository extends BaseRepositoryType<UserTypesDBO, UserTypes> implements IUserTypesRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.UserTypes);
    this.sequelizeDI = sequelizeDI;
  }
  getUserType({ model, transaction }: { model: UserTypesDBO, transaction?: number }): Promise<UserTypes[]> {
    let where: Partial<UserTypesDBO> = {
      project_id: this.context.project.id,

    }
    if (model.id) {
      where.id = model.id
    }
    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.UserTypeRoles,
          as: "usertype_roles",
          include: [
            {
              model: this.sequelizeDI.RolesProject,
              as: "roles",
              include: [
                {
                  model: this.sequelizeDI.Roles,
                  as: "role_detail",
                }
              ]
            }
          ]
          
        },
        {
          model: this.sequelizeDI.Translations,
          as: "translation"
         
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
}


export const UserTypesRepositoryPlugin = {
  pluginName: "user-types-repository",
  type: 'repository',
  di: 'userTypesRepositoryDI',
  classType: UserTypesRepository
};
