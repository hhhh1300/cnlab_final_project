/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { pool } from '@/model/init';

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, password } = req.body;
  const member_id = uuidv4();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = 'INSERT INTO member (member_id, name, password) VALUES (?, ?, ?)';
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error(err);
      res.status(400).json(err);
    } else {
      connection.query(query, [member_id, name, hashedPassword], (err: any, rows: any) => {
        if (err) {
          console.error(err);
          res.status(400).json(err);
        }
        res.status(200).json({ message: 'success' });
        connection.release();
      });
    }
  });
};

export const login = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.authenticate('local', (err: any, user: any, info: any) => {
    console.log('login');
    if (!user || err) {
      return res.status(400).json({ message: info.messages });
    }
    req.logIn(user, (err) => {
      if (err) {
        throw err;
      }
      console.log('login success');
      return res.status(200).json(user);
    });
  })(req, res);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'You have successfully logged out' });
  });
};

export const isLogin = (req: Request, res: Response) => {
  // console.log(req);
  res.status(200).json(req.user);
};

export const getUserById = async (req: Request, res: Response) => {
  const { member_id } = req.query;
  const query = 'SELECT * FROM member WHERE member_id = ?';
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error(err);
      res.status(400).json(err);
    } else {
      connection.query(query, [member_id], (err: any, rows: any) => {
        if (err) {
          console.error(err);
          res.status(400).json(err);
        }
        res.status(200).json(rows[0]);
        connection.release();
      });
    }
  });
};
