import { IStatusRepository } from "./statusRepository.js";
import { IStatusProjectsRepository } from "./statusProjectsRepository.js";
import { IStatusActionsRepository } from "./statusActionsRepository.js";

export type STATUS_REPOSITORY = {
  statusRepositoryDI: IStatusRepository;
  statusProjectsRepositoryDI: IStatusProjectsRepository;
  statusActionsRepositoryDI: IStatusActionsRepository;
};