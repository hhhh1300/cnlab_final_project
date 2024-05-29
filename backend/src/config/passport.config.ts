/* eslint-disable @typescript-eslint/no-explicit-any */
import { pool } from '@/model/init';
import { Strategy as LocalStrategy } from 'passport-local';

import passport from 'passport';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password',
    },
    async (name, password, done) => {
      console.log('local strategy');
      const query = 'SELECT * FROM member WHERE name = ?';
      const values = [name];
      try {
        return pool.getConnection((err: any, connection: any) => {
          if (err) {
            console.error(err);
            return done(null, false, { message: 'Internal Error' });
          } else {
            connection.query(query, values, (err: any, rows: any) => {
              connection.release();
              if (err) {
                return done(null, false, { message: 'Internal Error' });
              }
              if (rows.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
              } else {
                const user = rows[0];
                if (!bcrypt.compareSync(password, user.password)) {
                  return done(null, false, { message: 'Incorrect password' });
                } else {
                  return done(null, user);
                }
              }
            });
          }
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  // console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser(async (user: any, done) => {
  // console.log('deserializeUser', user);
  const query = `SELECT * FROM member WHERE member_id = ?`;
  const values = [user.member_id];
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error(err);
      return done(null, false);
    } else {
      return connection.query(query, values, (err: any, rows: any) => {
        connection.release();
        if (err) {
          console.error(err);
          return done(null, false);
        }
        if (rows.length === 0) {
          return done(null, false);
        } else {
          const user = rows[0];
          return done(null, user);
        }
      });
    }
  });
});

// passport.deserializeUser(async (member_id: string, done) => {
//   // console.log('deserializeUser', member_id);
//   const connection = await createConnection({
//     host: `${env.DBHOST}`,
//     user: `${env.DBUSER}`,
//     password: `${env.DBPASSWORD}`,
//     port: env.DBPORT,
//     database: `${env.DBDATABASE}`,
//   });
//   const query = `SELECT * FROM member WHERE member_id = ?`;
//   const values = [member_id];

//   try {
//     const result = await connection.query(query, values);
//     console.log(result);
//     // if (result.rows.length === 0) {
//     //   return done(null, false);
//     // } else {
//     //   const user = result.rows[0];
//     //   return done(null, user);
//     // }
//   } catch (err) {
//     return done(err);
//   } finally {
//     await connection.end();
//   }
// });
