"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFormat = exports.usersInRoom = exports.userLeave = exports.getUser = exports.newUser = exports.users = void 0;
exports.users = [];
//user that joins to the chat
const newUser = (id, name, room) => {
    const user = { id, name, room };
    exports.users.push(user);
    return user;
};
exports.newUser = newUser;
//current user
const getUser = (id) => {
    return exports.users.find((user) => user.id === id);
};
exports.getUser = getUser;
//user that leaves the chat
const userLeave = (id) => {
    const index = exports.users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return exports.users.splice(index, 1)[0];
    }
};
exports.userLeave = userLeave;
// get users in a room
const usersInRoom = (room) => {
    return exports.users.filter((user) => user.room === room);
};
exports.usersInRoom = usersInRoom;
// this function sets up the display chat messages format
const messageFormat = (name, text) => {
    return {
        name,
        text,
    };
};
exports.messageFormat = messageFormat;
//# sourceMappingURL=users.js.map