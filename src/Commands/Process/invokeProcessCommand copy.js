// @ts-nocheck
import {BaseCommand} from "../../Architecture/Base/baseCommand.js";
import { PrivilegesDTO } from "justshare-shared";
import {LogFileInfrastructure} from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/Categories/categoryService.js";
import {DbTransactionInfrastucture} from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {AuthInfrastucture}from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class InvokeProcessCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, processServiceDI, actionProjectServiceDI, authInfrastructureDI, projectInfrastructureDI, dbTransactionInfrastuctureDI }) {
        super({
            logFileInfrastructureDI,
            authInfrastructureDI,
            projectInfrastructureDI,
            dbTransactionInfrastuctureDI
        });
        this.processServiceDI = processServiceDI
        this.actionProjectServiceDI = actionProjectServiceDI
    };
    init(dto) {
        let { process_id, chain_id, process_model, rejected, accepted, action_id } = { ...dto }
        this.model = process_model;
        this.process_id = process_id;
        this.chain_id = chain_id;
        this.rejected = rejected;
        this.accepted = accepted;
        this.action_id = action_id

    }
    getCurrentProcessChain(process, chain_id) {
        let chain = {}
        if (!chain_id) {
            chain = process.process_chain.filter(i => i.is_start)[0]
        } else {
            chain = process.process_chain.filter(i => i.id == chain_id)[0]
        }
        return chain
    }
    async runProcessChain(process, chain, result) {

        console.log(chain)
        let actions = await this.actionProjectServiceDI.setContext(this.context).getActions({ id: chain.action_id });
        let action = actions[0]
        let process_result = {}
        if (action.action_details.action_type == 'PROCESS' || action.action_details.as_process == true) {
            chain.action_id = this.action_id
            let command = action.action_details.name;
            let invoked = this.container.resolve(command);
            let model = { ...this.model };
            invoked.init(model);
            invoked.token = this.context.token;
            invoked.projectToken = this.context.projectToken
            invoked.referer = this.referer
            invoked.language = this.language;
            invoked.context.language = this.context.language;
            invoked.context.token = this.context.token;
            invoked.context.projectToken = this.context.projectToken;
            invoked.context.user = this.context.user;
            invoked.context.project = this.context.project
            invoked.process_chain = chain;
            invoked.process_chain.model = result
            process_result = await invoked.run();
        }
        if (chain.is_reminder) {
            if (process_result == true) {
                let next_process = chain.process_chain_state.filter(i => i.is_accept == true)[0]
                return {
                    next_chain_id: next_process.next_process_chain_id,
                    result: process_result,
                    autorun: next_process.next_process_chain_id ? true : false,
                }
            } else if (process_result == false) {


                let next_process = chain.process_chain_state.filter(i => i.is_accept != true)[0]
                console.log(next_process)
                return {
                    next_chain_id: next_process && next_process.next_process_chain_id,
                    result: process_result,
                    autorun: next_process ? true : false,
                    current_process_chain: chain,
                    next_chain_state: next_process
                }
            }
            return {
                next_chain_id: undefined,
                result: process_result,
                autorun: false,
                current_process_chain: chain,
                next_chain_state: next_process
            }
        }
        

        if (chain.autorun == true) {

            let next_process = chain.process_chain_state.filter(i => i.is_accept == true)[0]
            return {
                next_chain_id: next_process && next_process.next_process_chain_id,
                result: process_result,
                autorun: next_process ? true : false,
                current_process_chain: chain,
                next_chain_state: next_process
            }

        } else {
            return {
                next_chain_id: undefined,
                result: process_result,
                autorun: false,
                current_process_chain: chain,
                next_chain_state: undefined
            }
        }
    }
    async action() {
        let processList = await this.processServiceDI.setContext(this.context).getProcess({ id: this.process_id });
        this.process = processList[0]
        //  let findFirstChain = process.process_chain.filter(i=>process.process_chain.map(i=>))
        let autorun_loop = true;
        let chain_id = this.chain_id
        let result_process = {}
        let process = this.process
        while (autorun_loop == true) {
            const chain = this.getCurrentProcessChain(this.process, chain_id)
            let { next_chain_id, result, autorun, current_process_chain, next_chain_state } = await this.runProcessChain(process, chain, result_process)
            console.log('current chain')
            /* const afterHookProcess = current_process_chain.process_chain_actions.filter(i => i.on_after_hook == true);
             if (afterHookProcess.length > 0) {
                 console.log('RUN OTHER PROCESS')
                 console.log(afterHookProcess)
                 for (let processHook in afterHookProcess) {
                     console.log(processHook)
                 }
 
             }*/
            current_process_chain.
                autorun_loop = autorun;
            chain_id = next_chain_id
            result_process = result
            console.log(autorun_loop)
        }

    }
};
