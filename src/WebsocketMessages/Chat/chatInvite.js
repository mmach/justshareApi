


export const chatUserInvite = ({ project_socket, user_id, conversation_id,conversation }) => {
    const obj = { project_socket, user_id, conversation_id }
    global.socket.of(project_socket).to('USER-' + user_id).emit('invite',
      {
        conversation_id: conversation_id,
        conversation: conversation
      })
}