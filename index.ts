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

// app.get('/', (req: any, res: any) => {
//   res.send('The sedulous hyena ate the antelope!');
// });

// app.get('/test', (eq: any, res: any) => {
//   return res.json({ message: 'Hello from back end' });
// });
// this function sets up the display chat messages format
function messageFormat(userName: string, text: string) {
  return {
    userName,
    text,
  };
}

// connection established
io.on('connection', (socket: Socket) => {
  
  const Admin = 'Admin';

  // welcome message
  socket.emit('message', messageFormat(Admin, 'welcome to this Chat'));

  // // emits message to users about new user
  // socket.broadcast.emit('message', messageFormat(Admin, 'A new user just entered the chat'));

  // // emits message about user disconnecting
  // socket.on('disconnect', () => {
  //   io.emit('message', messageFormat(Admin,'User just disconnected from the chat'));
  // });

  //listening for users messages
  socket.on('userMessage', (arg: string[]) => {
    console.log(socket.id, arg);
    io.emit('message', messageFormat('User', arg));
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
