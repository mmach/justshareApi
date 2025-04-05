import { IBaseRepositoryType } from "../../Architecture/Base/baseRepositoryType";
import { ActionPrivilegesDBO } from "../../DBO";
import { ActionPrivileges } from "../../Domain";


export interface IActionPrivilegesRepository extends IBaseRepositoryType<ActionPrivilegesDBO, ActionPrivileges> { }

