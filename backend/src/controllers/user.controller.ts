import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '@/model/init';
import { nowDate } from '@/utils/nowDate';

export const getUserName = async (req: Request, res: Response) => {
    console.log('getUserName');
    const member_id = req.query.member_id;
  
    const query = `
        SELECT name
        FROM member
        where member_id = ?;
        `;
    pool.getConnection((err: any, connection: any) => {
      if (err) {
        console.error(err);
        res.status(400).json(err);
      } else {
        connection.query(query,member_id, (err: any, rows: any) => {
          if (err) {
            console.error(err);
            res.status(400).json(err);
          }
          res.status(200).json(rows);
          connection.release();
        });
      }
    });
};

export const getUserTraffic = async (req: Request, res: Response) => {
    console.log('getUserTraffic');
    const member_id = req.query.member_id;
  
    const query = `
        SELECT traffic
        FROM member
        where member_id = ?;
        `;
    pool.getConnection((err: any, connection: any) => {
      if (err) {
        console.error(err);
        res.status(400).json(err);
      } else {
        connection.query(query,member_id, (err: any, rows: any) => {
          if (err) {
            console.error(err);
            res.status(400).json(err);
          }
          res.status(200).json(rows);
          connection.release();
        });
      }
    });
};
  