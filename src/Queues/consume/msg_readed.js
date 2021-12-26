

import SequelizeDB from '../../Database/models/index.js';


const onReadMessage = async data => {
  let obj = JSON.parse(data.content.toString())
  await SequelizeDB.ConversationMessageMembers.update({
    status: 'R'
  },
    {
      where: {
        conversation_id: obj.conversation_id,
        project_id: obj.project_id,
        user_id: obj.user_id
      }
    }

  )

  try {

    global.socket.of(obj.project_socket).to(obj.conversation_id).emit('msg_read',
      {
        user_id: obj.user_id,
        conversation_id: obj.conversation_id
      })
  } catch (er) {
    console.log(er)
  }

  global.queueChannel.ack(data);
}

module.exports = { onReadMessage }
