let checkSum = function (item, esItem) {
    let r = esItem.itemCategoryOption.filter(i => {
        return item.itemCategoryOption.filter(l => { return i.co_temp_id == l.co_temp_id && i.value == l.value }).length > 0
    })
    return r.length == esItem.itemCategoryOption.length
}

export default checkSum;