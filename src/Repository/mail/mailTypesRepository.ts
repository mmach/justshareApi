import { IBaseRepositoryType } from "../../Architecture";
import { MailTypesDBO } from "../../DBO";
import { MailTypes } from "../../Domain";


export interface IMailTypesRepository extends IBaseRepositoryType<MailTypesDBO, MailTypes> {
  getAll({ transaction }: { transaction?: number }): Promise<MailTypes[]>;
}
