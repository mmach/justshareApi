import { IBaseServiceType } from "../../Architecture";
import { ActionsDBO } from "../../DBO";
import { Actions } from "../../Domain";


export interface IActionService extends IBaseServiceType<ActionsDBO, Actions> {
  getActions({}: {}): Promise<Actions[]>;
}

