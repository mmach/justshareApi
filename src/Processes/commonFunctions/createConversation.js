import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4"



let createConversation = async function (iua_id, uniq_number, user) {
    await this.conversationServiceDI.setContext(this.context).createConversation({
        id: uuid(),
        user_owner: this.context.user,
        message: this.model.message,
        user_dest: [user],
        iua_id: iua_id,
        title: "IUA." + uniq_number,
        status: 'B'
    })
}

export default createConversation;