/*
export default class UserProjectPrivilegesRepository extends BaseRepositoryType<UserProjectPrivilegesD , Roles> implements IRolesRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.User);
    this.sequelizeDI = sequelizeDI;
  }

  deleteUserPriv({ user_id, transaction }: { user_id: string, transaction: number }): Promise<any> {
    return this.sequelizeDI.UserProjectPrivileges.destroy({
      where: {
        user_id: user_id
      },
      transaction: transaction
    });


  }

}

*/