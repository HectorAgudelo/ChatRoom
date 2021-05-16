import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app: any = express();
const server: any = http.createServer(app);
const io: any = new Server(server, {
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

// connection established
io.on('connection', (socket: Socket) => {
  console.log('New connection....');

  // welcome message
  socket.emit('message', 'welcome to this Chat');

  // emits message to users about new user
  socket.broadcast.emit('message', 'New user...');

  // emits message about user disconnecting
  socket.on('disconnect', () => {
    io.emit('message', 'User disconnected');
  });

  socket.on('message', (arg: string[]) => {
    console.log(socket.id, arg);
    io.emit('message', arg);
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
