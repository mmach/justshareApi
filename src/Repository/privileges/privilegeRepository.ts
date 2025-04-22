import { IBaseRepositoryType } from "../../Architecture";
import { PrivilegesDBO } from "../../DBO";
import { Privileges } from "../../Domain";


export interface IPrivilegeRepository extends IBaseRepositoryType<PrivilegesDBO, Privileges> {
  getPrivileges({ transaction }: { transaction?: number }): Promise<Privileges[]>;
}
