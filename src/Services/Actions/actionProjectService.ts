import { IBaseServiceType } from "../../Architecture";
import { ActionsProjectDBO } from "../../DBO";
import { ActionsProject } from "../../Domain";

export interface IActionProjectService extends IBaseServiceType<ActionsProjectDBO, ActionsProject> {
  getActions({ id }: { id: string }): Promise<ActionsProjectDBO[] | null> 
}
  