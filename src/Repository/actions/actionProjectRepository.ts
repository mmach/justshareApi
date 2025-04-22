import { IBaseRepositoryType } from "../../Architecture";
import { ActionsProjectDBO } from "../../DBO";
import { ActionsProject } from "../../Domain";

export interface IActionProjectRepository extends IBaseRepositoryType<ActionsProjectDBO, ActionsProject> {
    getActions({ id, transaction }: { id: string; transaction?: number }): Promise<ActionsProject[]>;

}
