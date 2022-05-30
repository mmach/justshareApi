import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4"



let createIUA = async function (iua_id, item, message) {

    let uniq_number = new Date().getTime()
    let itemResult = item
    if (this.model.parent_iua_id) {
        itemResult = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({iua_id:[this.model.parent_iua_id]})
        itemResult=itemResult[0]
    }
    //let iua_id = uuid()
    //   let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.NEW })
    await this.itemUserActionServiceDI.setContext(this.context).upsert({
        model: {
            id: iua_id,
            item_id: itemResult.item_id || itemResult.id,
            user_id: this.context.user.id,
            action_id: this.process_chain.action_id,
            status: 'N',
            comment: message,
            uniq_number: uniq_number,
            status_id: this.process_chain.status_id,
            created_date: new Date(),
            process_id: this.process_chain.process_id,
            process_chain_id: this.process_chain.id,
            parent_process_id: this.parent_process_chain.process_id,
            parent_process_chain_id: this.parent_process_chain.id,
            parent_iua_id: this.model.parent_iua_id
        },
        withProject: true
    })
    let transaction_id = uuid()
   
    await this.itemTransactionsServiceDI.setContext(this.context).upsert({
        model: {
            ...itemResult,
            id: transaction_id,
            item_id: itemResult.item_id || itemResult.id,
            iua_id: iua_id,
            parent_iua_id: this.model.parent_iua_id || this.model.iua_id
        },
        withProject: true
    })
    if (!this.model.parent_iua_id) {
        await this.itemTransactionCategoryOptionsServiceDI.setContext(this.context).bulkInsert({
            model: item.itemCategoryOption.map(i => {
                return {
                    ...i,
                    id: uuid(),
                    itemTransaction_id: transaction_id,
                    item_id: item.id,
                    iua_id: iua_id
                }
            }),
            withProject: true
        })
    }
    return { iua_id, uniq_number }

}


export default createIUA;