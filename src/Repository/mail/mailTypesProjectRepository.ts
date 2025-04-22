import { IBaseRepositoryType } from "../../Architecture";
import { MailTypesProjectsDBO } from "../../DBO";
import { MailTypesProjects } from "../../Domain";


export interface IMailTypesProjectRepository extends IBaseRepositoryType<MailTypesProjectsDBO, MailTypesProjects> {
  getAll({ model, transaction }: { model?: { mailtype: string }; transaction?: number }): Promise<MailTypesProjects[]>;
}
