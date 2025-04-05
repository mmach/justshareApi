import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { PrivilegesDBO } from "../privileges";

export interface ActionPrivilegesDBO extends BaseDBO {
  id: string;
  privilege_id: string;
  project_id: string;
  action_id: string;
  logical_op: string;
  status: boolean;
  
  privileges:PrivilegesDBO
}
