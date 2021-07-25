
import { ItemDTO, BuildItem, ShowOptionValue, StatusesList, GetValueByDim, DimensionsList } from "justshare-shared";
import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4.js";


let updateItemChain = async function (item, process_id, process_chain_id) {
    
    let id = uuid();
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
    if (this.process_chain.change_status==true) {
        await this.itemServiceDI.setContext(this.context).update({ model: item })
    }
    
    try {
        const val = JSON.parse(this.process_chain.params)
        if (val.api.mail) {
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

export { updateItemChain }