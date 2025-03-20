/*let checkSum = (item, esItem) => {
    let r = esItem.itemCategoryOption.filter(i => {
        return item.itemCategoryOption.filter(l => { return i.co_temp_id == l.co_temp_id && i.value == l.value }).length > 0
    })
    return r.length == esItem.itemCategoryOption.length
}

export default checkSum;*/
export const itemSync = async function (item_id) {

    await this.elasticSearchServiceDI.setContext(this.context).addToQueue({ item_id: item_id, operation: 'U' })

}
export default itemSync