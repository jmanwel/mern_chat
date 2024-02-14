const users = [];

const addUsers = ({ socket_id, name, user_id, room_id }) =>{
    const exists = users.find(user =>user.room_id == room_id && user.user_id == user_id);
    if (exists){
        return {error: "User already exists in this room"};
    }
    const user = { socket_id, name, user_id, room_id };
    users.push(user);
    console.log("Users list", users)
    return { user }
}

const removeUsers = (socket_id) => {
    const index = users.findIndex(user =>user.socket_id === socket_id);
    if (index !== -1) {
        return users.splice(index,1)[0];
    }
}

const getUser = (socket_id) => users.find(user =>user.socket_id === socket_id);

const getUsers = () => users;

module.exports = { addUsers, removeUsers, getUser, getUsers }