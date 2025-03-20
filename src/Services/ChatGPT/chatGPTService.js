import OpenAI from 'openai';
import { BaseService } from "../../Architecture/Base/baseService";
import CONFIG from "../../config.js";

/**
 *
 * @export
 * @class ChatGPTServoce
 * @extends BaseService
 */
class ChatGPTService extends BaseService {
    /**
     * Creates an instance of UserService.
     * @param   {{ unitOfWorkDI: UnitOfWork }}
     */
    constructor({ unitOfWorkDI, cmsElementsProjectServiceDI, actionProjectServiceDI, cmsPageProjectServiceDI, processServiceDI }) {
        super({ unitOfWorkDI });
        this.cmsElementsProjectServiceDI = cmsElementsProjectServiceDI;
        this.actionProjectServiceDI = actionProjectServiceDI
        this.cmsPageProjectServiceDI = cmsPageProjectServiceDI
        this.cmsPageProjectServiceDI = cmsPageProjectServiceDI
        this.processServiceDI = processServiceDI;

    }

    async generateCMSElement({ prompt }) {

        const cmsElements = await this.cmsElementsProjectServiceDI.setContext(this.context).getCmsElementsAdmin({});
        const cmsPage = await this.cmsPageProjectServiceDI.setContext(this.context).getCmsPageAdmin({});
        const actions = await this.actionProjectServiceDI.setContext(this.context).getActions({});
        const client = new OpenAI({
            apiKey: CONFIG.CHAT_GPT_KEY
        });
        var allActions = actions.filter(i => ['UI_PLUGIN', 'VIEW'].includes(i.action_details.action_type)).map(i => i.action_details.name)
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: allActions.join(',') },
            ...cmsElements.map(i => ({ role: 'user', content: `name : ${i.token} - cms: ${i.cms}` })),
            ...cmsPage.filter(i => i.cms).map(i => ({ role: 'user', content: `name : ${i.title} urL:${i.url}  cms: ${i.cms}` })), { role: 'user', content: `${prompt}. Return only json` }],
            model: 'gpt-4o',
        });
        console.log(chatCompletion.choices[0].message.content)
        return JSON.parse(chatCompletion.choices[0].message.content);
    }

    async generateProcess({ prompt }) {

        let processes = await this.processServiceDI.setContext(this.context).getProcess({});
        const actions = await this.actionProjectServiceDI.setContext(this.context).getActions({});
        var allActions = actions.filter(i => ['PROCESS', 'VIEW'].includes(i.action_details.action_type)).map(i => i.action_details.name)

        processes = processes.filter(i => ['CREATE_ITEM', 'INVOICE_PROCESS', 'OWNER_RATE_RESERVATION', 'RESERVATION'].includes(i.token))
      
        const client = new OpenAI({
            apiKey: CONFIG.CHAT_GPT_KEY
        });
        var chains = [];
        processes.forEach(p => chains = [...chains, ...p.process_chain])
        const chatCompletion = await client.chat.completions.create({
            messages: [
                { role: 'user', content: allActions.join(',') },
                ...processes.map(i => ({ role: 'user', content: `name : ${i.token},process_id:${i.process_id}, process: ${JSON.stringify({ ...i })}` })),

                { role: 'user', content: `${prompt}. Return only json, Please tread id all id-s as UUID` }],
            model: 'gpt-4o-mini',
        });
        return JSON.parse(chatCompletion.choices[0].message.content);
    }
}

export const ChatGPTServicePlugin = {
    pluginName: "chat-gpt-service",
    type: 'service',
    di: 'chatGPTServiceDI',
    classType: ChatGPTService
} 
