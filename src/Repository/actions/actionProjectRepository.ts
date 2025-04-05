import { IBaseRepositoryType } from "../../Architecture/Base/baseRepositoryType";
import { ActionsProjectDBO } from "../../DBO";
import { ActionsProject } from "../../Domain";

export interface IActionProjectRepository extends IBaseRepositoryType<ActionsProjectDBO, ActionsProject> { }
