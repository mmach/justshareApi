
import SequelizeDB from '../../Database/models/index.js';
import * as useSockets from '../../WebsocketMessages/index.js';


const onSendMessage = async data => {
  try {
    let obj = JSON.parse(data.content.toString())
    obj.message = obj.message.substring(0, 8000);
    await SequelizeDB.ConversationMessages.create(
      obj

    )
    let prom = obj.users.map(i => {
      return SequelizeDB.ConversationMessageMembers.create(
        {
          id: i.id,
          user_id: i.user_id,
          conversation_id: obj.conversation_id,
          project_id: obj.project_id,
          message_id: obj.id,
          status: 'N'
        }

      )
    })
    await Promise.all(prom);
    try {
      useSockets.chatMessageSaved({ project_socket: obj.project_socket, user_id: obj.user_id, conversation_id: obj.conversation_id, message_id: obj.id })
    } catch (er) {
      console.log(er)
    }
  } catch (err) {
    console.log(err);
  }
  global.queueChannel.ack(data);
}
module.exports = { onSendMessage }
