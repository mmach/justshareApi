import { uuid } from "../../../node_modules/uuidv4/build/lib/uuidv4"



let createConversation = async function (iua_id, uniq_number, user,message) {
    await this.conversationServiceDI.setContext(this.context).createConversation({
        id: uuid(),
        user_owner: this.context.user,
        message: message,
        user_dest: [user],
        iua_id: iua_id,
        title: "IUA." + uniq_number,
        status: 'O',//'B'
    })
}

export default createConversation;