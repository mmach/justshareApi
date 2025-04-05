import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { ProcessDBO } from "../process";
import { StatusActionsDBO } from "../status";
import { ActionPrivilegesDBO } from "./actionPrivileges";
import { ActionsDBO } from "./actions";


export interface ActionsProjectDBO extends BaseDBO {
  id: string;
  action_id?: string;
  project_id?: boolean;
  status?: string;
  func?: string;
  process_id?: string;
  
  action_details: ActionsDBO
  action_privileges: ActionPrivilegesDBO[]
  statuses: StatusActionsDBO[]
  process?: ProcessDBO
}

