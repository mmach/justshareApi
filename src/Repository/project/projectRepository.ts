import { IBaseRepositoryType } from "../../Architecture";
import { ProjectDBO } from "../../DBO";
import { Project, vProject } from "../../Domain";

export interface IProjectRepository extends IBaseRepositoryType<ProjectDBO, Project> {
  getProjectInfo({ project_id, transaction }: { project_id: string; transaction?: number }): Promise<vProject | null>;
  getProjectDetails({ id, transaction }: { id: string; transaction?: number }): Promise<vProject | null>;
  authProject({
    project_id,
    secretKey,
    authBySensorMac,
    transaction
  }: {
    project_id: string;
    secretKey: string;
    authBySensorMac: boolean;
    transaction?: number;
  }): Promise<Project | null>;
  getProjectsSockets({ transaction }: { transaction?: number }): Promise<Project[]>;
  getProjctUsers({ transaction }: { transaction?: number }): Promise<vProject | null>;
}
