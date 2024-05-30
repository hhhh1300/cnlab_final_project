import express from 'express';
import session from 'express-session';
import compression from 'compression';
import { env } from '@/utils/env';
import cors from 'cors';
import { databaseConnection, pool, sessionStore } from '@/model/init';
import routes from '@/routes';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';
import '@/config/passport.config';

type Message = {
  message_id: string;
  activity_id: string;
  member_id: string;
  message_content: string;
  message_timestamp: Date;
};

const app = express();

app.use(
  cors({
    credentials: true,
    origin: `${env.CLIENT_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  // New user has connected
  // console.log('A user connected');
  // socket.on('join', (room) => {
  //   socket.join(room);
  //   socket.emit('joined', room, socket.id);
  //   console.log('A user joined room: ' + room);
  // });
  // // User has disconnected
  // socket.on('leave', (room) => {
  //   console.log('A user disconnected');
  //   socket.leave(room);
  //   socket.emit('leave', room, socket.id);
  // });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  // User has sent a message
  socket.on('send_message', (newMessage: Message) => {
    console.log('send message');
    io.emit('receive_message', newMessage);
  });
});

app.set('trust proxy', 1);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: env.SECRET_KEY,
    name: 'session',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      ...(process.env.NODE_ENV === 'production' && {
        sameSite: 'none',
      }),
    },
  })
);
// 初始化 Passport
app.use(passport.initialize());
// 如果要使用 login session 時需設定
app.use(passport.session());
// app.use(passport.authenticate('session'));
app.use('/api', routes);

// app.listen(8080, () => {
//   databaseConnection();
//   console.log('Server started on http://localhost:8080');
// });
server.listen(8080, () => {
  databaseConnection();
  console.log('server is running on http://localhost:8080');
});
