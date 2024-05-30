import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '@/model/init';
import { nowDate } from '@/utils/nowDate';

// get 20 activities data
export const getActivityAll = async (req: Request, res: Response) => {
  console.log('getActivityAll');
  const category = req.query.category;

  const timestamp = nowDate();

  if (category === 'all' || category === undefined) {
    const query = `
      SELECT *
      FROM activity
      order by register_start_timestamp desc
      limit 20;
      `;
    pool.getConnection((err: any, connection: any) => {
      if (err) {
        console.error(err);
        res.status(400).json(err);
      } else {
        connection.query(query, (err: any, rows: any) => {
          if (err) {
            console.error(err);
            res.status(400).json(err);
          }
          res.status(200).json(rows);
          connection.release();
        });
      }
    });
  } else {
    const query = `
    SELECT *
    FROM activity
    where activity_tag = ?
    order by register_start_timestamp asc
    limit 20;
    `;
    const values = [category];
    pool.getConnection((err: any, connection: any) => {
      if (err) {
        console.error(err);
        res.status(400).json(err);
      } else {
        connection.query(query, values, (err: any, rows: any) => {
          if (err) {
            console.error(err);
            res.status(400).json(err);
          }
          res.status(200).json(rows);
          connection.release();
        });
      }
    });
  }
};

export const getActivityFromMemberID = async (req: Request, res: Response) => {
  console.log('getActivityFromMemberID');
  const member_id = req.query.member_id;

  const timestamp = nowDate();
  const query = `
    SELECT *
    FROM member_join_activity
    Inner join activity
    On activity_id = activity.activity_id
    where member_id = ?
    `;
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error(err);
      res.status(400).json(err);
    } else {
      connection.query(query, member_id, (err: any, rows: any) => {
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
