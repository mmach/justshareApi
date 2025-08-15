// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { PrivilegesDTO } from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/category/implementations/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";
import CONFIG from "../../config.js";
import Promise from "bluebird";

"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class RunCronQueueCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, processServiceDI }) {
        super({
            logFileInfrastructureDI,
        });
        this.processServiceDI = processServiceDI

    };
    init(dto) {
        this.model = { ...dto }

    }

    async action() {
        let processList = await this.processServiceDI.setContext(this.context).getItemReminder({ reminder_cron: this.model.reminder_cron, project_id: this.model.project_id });
        await Promise.mapSeries(processList, async (item) => {
            console.log(item)
            try {
                global.queueChannel.publish(CONFIG.REMINDER_QUEUE, item.project_id,
                    {
                        id: item.item_id,
                        item_id: item.item_id,
                        iua_id: item.item_id,
                        project_id: item.project_id,
                        process_id: item.process_id,
                        process_chain_id: item.process_chain_id
                    }, {
                    contentType: 'application/json', persistent: true, expiration: 1200 * 1000, messageId: item.item_id + item.process_chain_id, headers: {

                    }
                })

            } catch (er) {
                console.log(er)
            }

        })


        //return result

        // await this.privilegeServiceDI.setContext(this.context).upsert({ model: this.model, withProject: true });
    }
};
