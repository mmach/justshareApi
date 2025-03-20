
import { v4 } from "uuid";


export const updateItemChain = async function (item, process_id, process_chain_id) {

    let id = v4();
    item.process_chain_id = process_chain_id;
    item.process_id = process_id;
    item.item_process_id = id;
    item.process_updated_date = new Date();
    await this.itemServiceDI.setContext(this.context).setItemProcessChain({
        id: id,
        item_id: item.id,
        process_chain_id,
        process_id
    })
    if (this.process_chain.change_status == true) {
        await this.itemServiceDI.setContext(this.context).update({ model: item })
    }

    try {
        const val = JSON.parse(this.process_chain.params)
        if (val.api && val.api.mail) {
            if (val.api.mail.dest) {
                await this.mailSenderDI.setContext(this.context).mailSend({
                    type: val.api.mail.dest.mail_template,
                    model: item,
                    email_to: 'michal.mach@mapps.io',
                    language: 'pl',
                });
            }
        }
    } catch (err) {
        console.log(err)
    }
}

