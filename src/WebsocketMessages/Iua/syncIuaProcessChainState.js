export const syncIuaProcessChain = ({ project_socket, iua_id, iua_process_obj }) => {
    global.socket.of(project_socket).to('IUA-' + iua_id).emit('iua_process_chain', iua_process_obj);

}


