// @ts-nocheck
import { v4 } from "uuid";
import BaseCommand from "../../Architecture/baseCommand.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/categoryService.js";

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
    getCurrentProcessChain(process, chain_id, next_chain_edge_path) {
        let chain = {}
        if (!chain_id) {
            chain = process.process_chain.filter(i => i.is_start)[0]
        } else {
            chain = process.process_chain.filter(i => i.id == chain_id)[0]
        }
        if (next_chain_edge_path == true || next_chain_edge_path == false) {
            let next_process = chain.process_chain_state.filter(i => i.is_accept == next_chain_edge_path)[0]
            chain = process.process_chain.filter(i => i.id == next_process.next_process_chain_id)[0]
        }
        return chain
    }
    async runProcessChain(process, chain, result, parent_process_chain = {}, model = {}) {

        //  console.log(chain)
        const chain_action = chain.process_chain_actions.find(i => i.action_type == 'MAIN_ACTION')
        let actions = await this.actionProjectServiceDI.setContext(this.context).getActions({ id: chain_action.action_id });
        let action = actions[0]
       
        let process_result = {}
        if (action.action_details.action_type == 'PROCESS' || action.action_details.as_process == true) {
            chain.action_id = chain_action.action_id
            let command = action.action_details.name;
            let invoked = this.container.resolve(command);
            invoked.init({
                ...model,
            });
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
            invoked.parent_process_chain = parent_process_chain;
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
                result: {},
                autorun: false,
                current_process_chain: chain,
                next_chain_state: undefined
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
    async runProcess(process_id, chain_id, parent_process_chain, model, edge_path = null) {
        let processList = await this.processServiceDI.setContext(this.context).getProcess({ id: process_id });
        let process = processList[0]
        let autorun_loop = true;
        let result_process = {}
        const uuidNew = v4()
        let newModel = {
            ...model,
            id: parent_process_chain.id ? uuidNew : model.iua_id || model.id,
            iua_id: parent_process_chain.id ? uuidNew : model.iua_id,
            parent_iua_id: parent_process_chain.id ? model.iua_id || model.id : undefined,
            parent_ips_id: parent_process_chain.id ? model.id : undefined
        };

        while (autorun_loop == true) {
            const chain = this.getCurrentProcessChain(process, chain_id, edge_path)
            if (!chain) {
                return;
            }
            edge_path = null;
            let { next_chain_id, result, autorun, current_process_chain, next_chain_state } = await this.runProcessChain(process, chain, result_process, parent_process_chain, newModel)
            if (current_process_chain) {
                const afterHookProcess = current_process_chain.process_chain_actions.filter(i => i.on_after_hook == true);
                if (afterHookProcess.length > 0) {
                    for (let processHook in afterHookProcess) {
                        let actionProcess = afterHookProcess[processHook]
                        await this.runProcess(actionProcess.external_process_id, actionProcess.external_process_chain_id, current_process_chain, newModel)
                    }
                }
            }
            if (result && result.invoke && result.invoke.length > 0) {
                for (let index in result.invoke) {
                    let invoke = result.invoke[index]
                    let modelInvoked = {
                        iua_id: invoke.iua_id,
                        id: invoke.iua_id
                    }
                    await this.runProcess(invoke.process_id, invoke.process_chain_id, {}, modelInvoked, true)
                }
            }
            current_process_chain;
            autorun_loop = autorun;
            chain_id = next_chain_id
            result_process = result
        }
    }
    async action() {
        let process_id = this.process_id
        let chain_id = this.chain_id
        await this.runProcess(process_id, chain_id, {}, this.model)
    }
};
