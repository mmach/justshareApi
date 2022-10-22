import {v4} from "uuid";



let createConversation = async function (iua_id, uniq_number, user,message) {
    await this.conversationServiceDI.setContext(this.context).createConversation({
        id: v4(),
        user_owner: this.context.user,
        message: message,
        user_dest: [user],
        iua_id: iua_id,
        title: "IUA." + uniq_number,
        status: 'O',//'B'
    })
}

export default createConversation;