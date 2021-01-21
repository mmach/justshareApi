import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4"



let createIUA = async function (item, message) {

    let uniq_number = new Date().getTime()
    let iua_id = uuid()
    //   let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.NEW })
    await this.itemUserActionServiceDI.setContext(this.context).upsert({
        model: {
            id: iua_id,
            item_id: item.id,
            user_id: this.context.user.id,
            action_id: this.process_chain.action_id,
            status: 'N',
            comment: message,
            uniq_number: uniq_number,
            status_id: this.process_chain.status_id,
            created_date: new Date(),
            process_id: this.process_chain.process_id,
            process_chain_id: this.process_chain.id


        },
        withProject: true

    })
    let transaction_id = uuid()

    await this.itemTransactionsServiceDI.setContext(this.context).upsert({
        model: {


            ...item,
            id: transaction_id,
            item_id: item.id,
            iua_id: iua_id

        },
        withProject: true

    })

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
    return { iua_id, uniq_number }

}


export default createIUA;