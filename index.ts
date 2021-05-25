import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import {
  newUser,
  getUser,
  messageFormat,
  userLeave,
  usersInRoom,
} from './users';
import fs from 'fs';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = 5000;

//stored messages array/
let chatMessages: any = [];

if (fs.existsSync('chatHistory.json')) {
  const rawContent = fs.readFileSync('chatHistory.json', 'utf8');
  chatMessages = JSON.parse(rawContent);
}

//push new messages to chatMessages array and condition to keep messages under 100
function storeNewMessage(newMsg: any) {
  chatMessages.push(newMsg);
  if (chatMessages.length > 30) {
    chatMessages.shift();
  }
  fs.writeFileSync('chatHistory.json', JSON.stringify(chatMessages, null, 2));
}

// connection established
io.on('connection', (socket: Socket) => {
  const Admin = 'Admin';

  socket.on('joinChat', ({ name, room }) => {
    const user = newUser(socket.id, name, room);
    socket.join(user.room);
    //filters messages by room
    const messageHistory = chatMessages.filter((msg: any) => msg.room === room);

    //sends messages history to the front
    socket.emit('previousMessages', ...messageHistory);
    // welcome message
    socket.emit(
      'message',
      messageFormat(Admin, `Welcome ${user.name} to ${user.room} room`)
    );
    //emits message to users about new user
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        messageFormat(Admin, `${user.name} just joined ${user.room} room`)
      );

    // // emits message about user disconnecting
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          'message',
          messageFormat(Admin, `${user.name} just left the ${user.room} room`)
        );
      }
    });
  });

  //listening for users messages
  socket.on('userMessage', (arg: string[]) => {
    const gettingUser = getUser(socket.id);
    //call of the storeNewMessage function (stores up to 30 messages)
    storeNewMessage({
      name: gettingUser.name,
      room: gettingUser.room,
      text: arg,
    });

    io.to(gettingUser.room).emit(
      'message',
      messageFormat(gettingUser.name, arg)
    );
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
