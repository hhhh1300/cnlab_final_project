import fs from 'fs';
import path from 'path';
import { env } from '@/utils/env';
import * as session from 'express-session';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MySQLStore = require('express-mysql-session')(session);

const pool = mysql.createPool({
  host: `${env.DBHOST}`,
  user: `${env.DBUSER}`,
  password: `${env.DBPASSWORD}`,
  port: env.DBPORT,
  database: `${env.DBDATABASE}`,
});

const sessionStore = new MySQLStore(
  {
    schema: {
      tableName: 'mire_sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  pool
);

pool.on('error', (err: any) => {
  console.error(err);
  process.exit(-1);
});

const databaseConnection = async () => {
  const sqlQuery = fs.readFileSync(path.join(__dirname, '/init.sql'), 'utf8');
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error(err);
    } else {
      const queries = sqlQuery.split('/');
      for (const query of queries) {
        connection.query(query, (error: any, results: any, fields: any) => {
          if (error) {
            console.error(error);
            process.exit(-1);
          }
        });
      }
      connection.release();
    }
  });
  console.log('Database initialized');
};

export { databaseConnection, pool, sessionStore };
