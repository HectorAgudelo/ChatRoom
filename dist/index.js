"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const users_1 = require("./users");
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const PORT = 5000;
//stored messages array/
let chatMessages = [];
if (fs_1.default.existsSync('chatHistory.json')) {
    const rawContent = fs_1.default.readFileSync('chatHistory.json', 'utf8');
    chatMessages = JSON.parse(rawContent);
}
//push new messages to chatMessages array and condition to keep messages under 100
function storeNewMessage(newMsg) {
    chatMessages.push(newMsg);
    if (chatMessages.length > 30) {
        chatMessages.shift();
    }
    fs_1.default.writeFileSync('chatHistory.json', JSON.stringify(chatMessages, null, 2));
}
// connection established
io.on('connection', (socket) => {
    const Admin = 'Admin';
    socket.on('joinChat', ({ name, room }) => {
        const user = users_1.newUser(socket.id, name, room);
        socket.join(user.room);
        //filters messages by room
        const messageHistory = chatMessages.filter((msg) => msg.room === room);
        //sends messages history to the front
        socket.emit('previousMessages', ...messageHistory);
        // welcome message
        socket.emit('message', users_1.messageFormat(Admin, `Welcome ${user.name} to ${user.room} room. Take a look at previous conversations!`));
        //emits message to users about new user
        socket.broadcast
            .to(user.room)
            .emit('message', users_1.messageFormat(Admin, `${user.name} just joined ${user.room} room`));
        // // emits message about user disconnecting
        socket.on('disconnect', () => {
            const user = users_1.userLeave(socket.id);
            if (user) {
                io.to(user.room).emit('message', users_1.messageFormat(Admin, `${user.name} just left the ${user.room} room`));
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: users_1.usersInRoom(user.room),
                });
            }
        });
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: users_1.usersInRoom(user.room),
        });
    });
    //listening for users messages
    socket.on('userMessage', (arg) => {
        const gettingUser = users_1.getUser(socket.id);
        //call of the storeNewMessage function (stores up to 30 messages)
        storeNewMessage({
            name: gettingUser.name,
            room: gettingUser.room,
            text: arg,
        });
        io.to(gettingUser.room).emit('message', users_1.messageFormat(gettingUser.name, arg));
    });
});
server.listen(PORT, () => {
    console.log(`server listening on port: http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map