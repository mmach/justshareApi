import { IBaseRepositoryType } from "../../Architecture";
import { UserInvoiceValueDBO } from "../../DBO";
import { UserInvoiceValue } from "../../Domain";

export interface IUserInvoiceValuesRepository extends IBaseRepositoryType<UserInvoiceValueDBO, UserInvoiceValue> {
  getUserInvoiceData({ user_id, transaction }: { user_id: number; transaction?: number }): Promise<UserInvoiceValue | null>;
}
