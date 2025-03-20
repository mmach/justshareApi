"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

import { ProjectDTO } from "justshare-shared";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";


/**
 *
 *
 * @export
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class UpdateProjectCommand extends BaseCommand {
    /**
     * Creates an instance of CreateUserCommand.
     * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
     * @memberof CreateUserCommand
     */
    constructor({
        logFileInfrastructureDI,
        dbTransactionInfrastuctureDI,
        projectInfrastructureDI,
        projectServiceDI
    }) {
        super({
            logFileInfrastructureDI,
            dbTransactionInfrastuctureDI,
            projectInfrastructureDI
        });
        this.projectServiceDI = projectServiceDI;
    }
    init(dto) {
        this.model = Object.assign(new ProjectDTO(), dto);
    }

    get validation() {
        return [
            async () => { await this.checkDTO.bind(this)(this.model) }
        ]
        }

    async action() {
        this.model.secretKey = undefined
        this.model.project_id = undefined
        this.model.user_id= undefined
        this.model.plan_id= undefined
        this.model.blob_main_id= undefined
        this.model.blob_logo_ver_id= undefined
        this.model.blob_logo_id= undefined
        this.model.blob_hor_id= undefined

        await this.projectServiceDI.setContext(this.context).update({ model: this.model, withProject: false })
        return 'OK'
    }

}