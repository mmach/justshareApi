
import { ItemDTO, BuildItem, ShowOptionValue, StatusesList, GetValueByDim, DimensionsList } from "justshare-shared";
import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4.js";


let reservationItemsTerms = async function () {
    let start = GetValueByDim(DimensionsList.RESERVATION_DAYS_START, this.itemTransaction, this.context.language)
    let end = GetValueByDim(DimensionsList.RESERVATION_DAYS_END, this.itemTransaction, this.context.language)
    let ico = this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.RESERVATION_DAYS_START })[0]

    let obj = await this.itemServiceDI.setContext(this.context).isFreeTerm({
        model: {
            item_id: this.IUA.item_id,
            start_date: start,
            end_date: end,
            dim_id: this.dimensions.filter(i => { return i.name == DimensionsList.RESERVATION_DAYS })[0].id,
        }
    })
    if (obj.length > 0) {
        throw 'NOT FREE TERMS'
    }


    await this.itemServiceDI.setContext(this.context).addCategoryOptionTerm({
        model: {
            id: uuid(),
            iua_id: this.IUA.id,
            item_id: this.IUA.item_id,
            start_date: start,
            end_date: end,
            dim_id: this.dimensions.filter(i => { return i.name == DimensionsList.RESERVATION_DAYS })[0].id,
            col_id: ico.col_id,
            co_id: ico.category_link.co_id
            // co_id:ico.
        }
    })
}
export default reservationItemsTerms;