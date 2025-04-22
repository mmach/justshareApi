import { IBaseRepositoryType } from "../../Architecture";
import { ProcessDBO } from "../../DBO";
import { Process } from "../../Domain";

export interface IProcessRepository extends IBaseRepositoryType<ProcessDBO, Process> {
  getProcess({ id, transaction }: { id: string | string[]; transaction?: number }): Promise<Process[]>;
  getItemReminder({
    reminder_cron,
    project_id,
    transaction
  }: {
    reminder_cron: string;
    project_id: string;
    transaction?: number;
  }): Promise<object[]>;
  getProcessCrons({ transaction }: { transaction?: number }): Promise<object[]>;
}
