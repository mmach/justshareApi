"use strict";
import { BaseCommand } from "../../Architecture/Base/baseCommand.js";

import { BlobBase64DTO } from "justshare-shared";
import { DbTransactionInfrastucture } from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import { LogFileInfrastructure } from "../../Architecture/Infrastructure/logFileInfrastructure.js";

/**
 *
 *
 * @export
 * @class CreateRoleCommand
 * @extends {BaseCommand}
 */
export default class UploadBlobProjectCommand extends BaseCommand {
    /**
     * Creates an instance of CreateUserCommand.
     * @param  {{logFileInfrastructureDI:LogFileInfrastructure , dbTransactionInfrastuctureDI:DbTransactionInfrastucture }}
     * @memberof CreateUserCommand
     */
    constructor({
        logFileInfrastructureDI,
        dbTransactionInfrastuctureDI,
        projectInfrastructureDI,
        blobServiceDI
    }) {
        super({
            logFileInfrastructureDI,
            dbTransactionInfrastuctureDI,
            projectInfrastructureDI
        });
        this.blobServiceDI = blobServiceDI;
    }
    init(dto) {
        this.model = Object.assign(new BlobBase64DTO(), dto);
    }

    get validation() {
        return [
            async () => { await this.checkDTO.bind(this)(this.model) }
        ]
        }

    async action() {
        await this.blobServiceDI.setContext(this.context).uploadProjectImage({ blob: this.model, withProject: false })
    }

}