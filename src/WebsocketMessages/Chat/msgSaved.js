


export const chatMessageSaved = ({ project_socket, user_id, conversation_id ,message_id}) => {
    const obj = { project_socket, user_id, conversation_id,message_id }
    global.socket.of(obj.project_socket).to('USER-' + obj.user_id).emit('msg-saved',
        {
            conversation_id: obj.conversation_id,
            message_id: obj.message_id
        })
}