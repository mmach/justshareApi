import { IBaseRepositoryType } from "../../Architecture";
import { MailSendersDBO } from "../../DBO";
import { MailSenders } from "../../Domain";

export interface IMailSendersRepository extends IBaseRepositoryType<MailSendersDBO, MailSenders> {
  getAll({ transaction }: { transaction?: number }): Promise<MailSenders[]>;
}
