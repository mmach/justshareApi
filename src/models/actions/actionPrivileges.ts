import { PrivilegesDTO } from "../privileges";

export interface ActionPrivilegesDTO {
  id: string;
  privilege_id: string;
  project_id: string;
  action_id: string;
  logical_op: string;
  status: boolean;
  
  privileges:PrivilegesDTO
}
