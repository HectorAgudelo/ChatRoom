import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
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

const users: any = [];
console.log(users)

//user that joins to the chat
function newUser(id: any, userName: any, room: any) {
  const user = { id, userName, room };
  users.push(user);
  return user;
}
//current user
function currentUser(id: any) {
  return users.find((user: any) => {
    user.id === id;
  });
}

// this function sets up the display chat messages format
function messageFormat(userName: string, text: string | string[]) {
  return {
    userName,
    text,
  };
}

// connection established
io.on('connection', (socket: Socket) => {
  const Admin = 'Admin';

  socket.on('joinChat', ({ userId, isCheck }) => {
    const user: any = newUser(socket.id, userId, isCheck )
    socket.join(user.isCheck)
    // welcome message
    socket.emit('message', messageFormat(Admin, 'welcome to this Chat'));
  });

  // // emits message to users about new user
  // socket.broadcast.to(user.room).emit('message', messageFormat(Admin, `${user.userId}A new user just entered the chat`));

  // // emits message about user disconnecting
  // socket.on('disconnect', () => {
  //   io.emit('message', messageFormat(Admin,'User just disconnected from the chat'));
  // });

  //listening for users messages
  socket.on('userMessage', (arg: string[]) => {
    const user = currentUser(socket.id)
    console.log(socket.id, arg);
    io.to(user.isCheck).emit('message', messageFormat(user, arg));
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
