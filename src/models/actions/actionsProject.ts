import { ProcessDTO } from "../process";
import { StatusActionsDTO } from "../status";
import { ActionPrivilegesDTO } from "./actionPrivileges";
import { ActionsDTO } from "./actions";


export interface ActionsProjectDTO {
  id: string;
  action_id?: string;
  project_id?: boolean;
  status?: string;
  func?: string;
  process_id?: string;
  
  action_details: ActionsDTO
  action_privileges: ActionPrivilegesDTO[]
  statuses: StatusActionsDTO[]
  process?: ProcessDTO
}

