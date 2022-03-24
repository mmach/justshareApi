
import { ItemDTO, BuildItem, ShowOptionValue, StatusesList, GetValueByDim, DimensionsList } from "justshare-shared";
import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4.js";
import updateWithoutStatusIUA from "./updateWithoutStatusIUA.js";


let updateIUA = async function (user_id, user_src, user_dest) {
    // if (!this.process_chain.with_iua_status_change) {
    //     await updateWithoutStatusIUA.bind(this)(this.IUA.id)
    //     return
    //}
    let id = uuid();
    if (!this.process_chain.only_invoke) {
        if (this.process_chain.change_status != true) {
            await this.itemUserActionServiceDI.setContext(this.context).update({
                model: {
                    id: this.model.iua_id,
                    process_chain_id: this.process_chain.id,
                    created_date: new Date()
                }, withProject: true
            })
        } else {
            await this.itemUserActionServiceDI.setContext(this.context).insert({
                model: {
                    ...this.IUA,
                    id: id,
                    iua_id: this.IUA.id,
                }, withProject: true,
            })

            await this.itemUserActionServiceDI.setContext(this.context).update({
                model: {
                    ...this.IUA,
                    comment: this.model.message,
                    user_id: user_id,
                    status: 'W',
                    iua_prev_id: id,
                    status_id: this.process_chain.status_id,
                    process_chain_id: this.process_chain.id,
                    created_date: new Date()
                }, withProject: true
            })
        }
    }


    let status = await this.statusProjectServiceDI.setContext(this.context).getByStatusId({ id: this.process_chain.status_id })
    try {
        const val = JSON.parse(this.process_chain.params)
        /* if (val.api.mail) {
             if (val.api.mail.dest) {
                 await this.mailSenderDI.setContext(this.context).mailSend({
                     type: val.api.mail.dest.mail_template,
                     model: {
                         iua_nr: this.IUA.uniq_number,
                         iua_id: this.IUA.id,
                         comment: this.model.message,
                         status: status.translation[user_dest.language],
                     },
                     email_to: user_dest.email,
                     language: user_dest.language,
                 });
             }
             if (val.api.mail.src) {
                 await this.mailSenderDI.setContext(this.context).mailSend({
                     type: val.api.mail.dest.mail_template,
                     model: {
                         iua_nr: this.IUA.uniq_number,
                         iua_id: this.IUA.id,
                         comment: this.model.message,
                         status: status.translation[user_src.language.language],
                     },
                     email_to: user_src.email,
                     language: user_src.language,
                 });
             }
         }*/

        if (val.api && val.api.notification) {
            await this.conversationServiceDI.setContext(this.context).sendMessageToUser({ iua_id: this.IUA.id, msg_id: uuid(), msg: this.model.message, syncSocket: true });
        }

        if (val.api && val.api.processSync) {
            await this.conversationServiceDI.setContext(this.context).iuaSetProcessChainId({ iua_id: this.IUA.id, process_chain_id: this.process_chain.id });
        }

    } catch (err) {
        console.log(err)
    }
    /* await this.mailSenderDI.setContext(this.context).mailSend({
         type: 'CHANGE_IUA_STATUS',
         model: {
             iua_nr: this.IUA.uniq_number,
             iua_id: this.IUA.id,
             comment: this.model.message,
             status: status.translation[user_src.language],
         },
         email_to: user_src.email,
         language: user_src.language,
     });
 
 
     await this.mailSenderDI.setContext(this.context).mailSend({
         type: 'CHANGE_IUA_STATUS',
         model: {
             iua_nr: this.IUA.uniq_number,
             iua_id: this.IUA.id,
             comment: this.model.message,
             status: status.translation[this.context.language],
         },
         email_to: user_dest.email,
         language: user_dest.language,
     });*/



}

export default updateIUA