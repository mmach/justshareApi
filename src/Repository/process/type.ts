import { IProcessRepository } from "./processRepository.js";
import { IProcessChainRepository } from "./processChainRepository.js";
import { IProcessChainStateRepository } from "./processChainStateRepository.js";
import { IProcessChainPrivilegesRepository } from "./processChainPrivilegesRepository.js";
import { IProcessChainActionInjectionRepository } from "./processChainActionInjectionRepository.js";

export type PROCESS_REPOSITORY = {
  processRepositoryDI: IProcessRepository;
  processChainRepositoryDI: IProcessChainRepository;
  processChainStateRepositoryDI: IProcessChainStateRepository;
  processChainPrivilegesRepositoryDI: IProcessChainPrivilegesRepository;
  processChainActionInjectionRepositoryDI: IProcessChainActionInjectionRepository;
};