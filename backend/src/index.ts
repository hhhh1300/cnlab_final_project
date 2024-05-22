import express from 'express';
import session from 'express-session';
import compression from 'compression';
import { env } from '@/utils/env';
import cors from 'cors';
import { databaseConnection, pool, sessionStore } from '@/model/init';
import routes from '@/routes';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: `${env.CLIENT_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
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
app.use('/api', routes);

app.listen(8080, () => {
  databaseConnection();
  console.log('Server started on http://localhost:3000');
});
