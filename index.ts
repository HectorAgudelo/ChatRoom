import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server: any = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT: number = 5000;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.get('/test', (req, res) => {
  return res.json({ message: 'Hello from back end' });
});

io.on('connection', (socket: Socket) => {
  console.log('New connection....');
});

io.on("message", (data:any)=> {
  console.log(data)
})

server.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
