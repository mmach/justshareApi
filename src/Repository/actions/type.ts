
import { IActionPrivilegesRepository, IActionProjectRepository, IActionRepository } from './index'

export type ACTIONS_REPOSITORY = {
    actionPrivilegesRepositoryDI: IActionPrivilegesRepository,
    actionProjectRepositoryDI: IActionProjectRepository,
    actionRepositoryDI: IActionRepository
}