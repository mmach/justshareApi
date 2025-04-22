import { IBaseRepositoryType } from "../../Architecture";
import { UserTypesDBO } from "../../DBO";
import { UserTypes } from "../../Domain";

export interface IUserTypesRepository extends IBaseRepositoryType<UserTypesDBO, UserTypes> {
  getUserType({ model, transaction }: { model: UserTypesDBO; transaction?: number }): Promise<UserTypes[]>;
}
