import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { newUser, getUser } from './users';
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

// this function sets up the display chat messages format
function messageFormat(name: string, text: string | string[]): any {
  return {
    name,
    text,
  };
}

// connection established
io.on('connection', (socket: Socket) => {
  const Admin = 'Admin';

  socket.on('joinChat', ({ name, room }) => {
    const user = newUser(socket.id, name, room);
    socket.join(user.room);
    // welcome message
    socket.emit(
      'message',
      messageFormat(
        Admin,
        `Welcome ${user.name} to ${user.room} Chat room`
      )
    );
    // // emits message to users about new user
  // socket.broadcast.to(user.room).emit('message', messageFormat(Admin, `${user.userId}A new user just entered the chat`));
  });

  

  // // emits message about user disconnecting
  // socket.on('disconnect', () => {
  //   io.emit('message', messageFormat(Admin,'User just disconnected from the chat'));
  // });

  //listening for users messages
  socket.on('userMessage', (arg: string[]) => {
    console.log('before sending it as par to getUser func', socket.id);
    const gettingUser = getUser(socket.id);

    console.log('this should bring the user id stored', gettingUser);
    io.to(gettingUser.room).emit(
      'message',
      messageFormat(gettingUser.name, arg)
    );
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
