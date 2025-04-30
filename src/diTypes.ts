import { REPOSITORIES } from "./Repository/type";
import UnitOfWork from "./unitOfWork";

export type UNIT_OF_WORK = { unitOfWorkDI: UnitOfWork }
export type DI = REPOSITORIES & UNIT_OF_WORK

