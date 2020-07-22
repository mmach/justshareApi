
import SequelizeDB from '../../Database/models/index.js';


const onSendMessage = async  data => {
    let obj = JSON.parse(data.content.toString())
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
      //global.socket.to('join-room', new Date());

      global.socket.of(obj.socket_user_id.split('#')[0]).to(obj.conversation_id).emit(obj.user_id + '-msg-saved',
        {
          conversation_id: obj.conversation_id,
          message_id: obj.id
        })
      //console.log(tmp)


    } catch (er) {
      console.log(er)
    }

    global.queueChannel.ack(data);
  }
  module.exports={onSendMessage}
