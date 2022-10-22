


let updateWithoutStatusIUA = async function (iua_id) {

    await this.itemUserActionServiceDI.setContext(this.context).update({
        model: {
            id: iua_id,
            process_chain_id: this.process_chain.id,
            created_date: new Date()
        }, withProject: true
    })



}

export default updateWithoutStatusIUA