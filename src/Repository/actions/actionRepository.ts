import { IBaseRepositoryType } from "../../Architecture/Base/baseRepositoryType";
import { ActionsDBO } from "../../DBO";
import { Actions } from "../../Domain";

export interface IActionRepository extends IBaseRepositoryType<ActionsDBO, Actions> { 
  getActions({ transaction }: { transaction?: number }): Promise<Actions[]>
}

