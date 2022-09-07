

import SequelizeDB from '../../Database/models/index.js';
import * as useSockets from '../../WebsocketMessages/index.js';


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
    useSockets.chatMessageRead({project_socket:obj.project_socket,user_id:obj.user_id,conversation_id:obj.conversation_id})
  } catch (er) {
    console.log(er)
  }

  global.queueChannel.ack(data);
}

module.exports = { onReadMessage }
