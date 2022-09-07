export const setIuaStatus = ({ project_socket, users, iua_socket_obj }) => {
    users.forEach(i => {
        global.socket.of(project_socket).emit(i.user_id + '-iua_status',
            iua_socket_obj)
    })
}


