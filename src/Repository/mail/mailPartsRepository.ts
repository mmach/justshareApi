import { IBaseRepositoryType } from "../../Architecture";
import { MailPartsDBO } from "../../DBO";
import { MailParts } from "../../Domain";

export interface IMailPartsRepository extends IBaseRepositoryType<MailPartsDBO, MailParts> {
  getAll({ transaction }: { transaction?: number }): Promise<MailParts[]>;
}
