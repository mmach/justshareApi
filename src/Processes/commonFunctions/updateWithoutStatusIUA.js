
import { ItemDTO, BuildItem, ShowOptionValue, StatusesList, GetValueByDim, DimensionsList } from "justshare-shared";
import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4.js";


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