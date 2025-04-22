import { IBaseServiceType } from "../../Architecture";
import { ActionPrivilegesDBO } from "../../DBO";
import { ActionPrivileges } from "../../Domain";


export interface IActionPrivilegesService extends IBaseServiceType<ActionPrivilegesDBO, ActionPrivileges> { }
