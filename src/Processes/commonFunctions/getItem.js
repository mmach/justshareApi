


export let getItem = async function (item_id, use_es) {
    //  if (!this.process_chain.with_iua_status_change) {
    //     await updateWithoutStatusIUA.bind(this)(this.IUA.id)
    //     return
    // }
    if (use_es) {
        let catoptions = []

        let result = await this.elasticSearchServiceDI.setContext(this.context).getItemById({
            item_id: item_id,
        })
        let itemsResult = JSON.parse(result.data["_source"].item)

        let resultDB = itemsResult;
       // console.log(resultDB)
        return resultDB
    } else {
        let item = await this.itemServiceDI.setContext(this.context).getItem({ uids: [item_id] })
        return item[0];
    }
    
}

