


export const chatMessageRead = ({ project_socket, user_id, conversation_id }) => {
    const obj = { project_socket, conversation_id, user_id }
    global.socket.of(obj.project_socket).to(obj.conversation_id).emit('msg_read',
        {
            user_id: obj.user_id,
            conversation_id: obj.conversation_id
        })
}