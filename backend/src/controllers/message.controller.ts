/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '@/model/init';

export const sendMessage = (req: Request, res: Response) => {
  const { activity_id, member_id, message_content } = req.body;
  console.log(activity_id, member_id, message_content);
  const message_id = uuidv4();
  const message_timestamp = new Date();
  const query = `INSERT INTO message (message_id, activity_id, member_id, message_content, message_timestamp) VALUES (?, ?, ?, ?, ?)`;
  const values = [message_id, activity_id, member_id, message_content, message_timestamp];
  pool.query(query, values, (err: any, results: any) => {
    if (err) {
      console.error(err);
      res.status(500).json('Error sending message');
    } else {
      return pool.query(
        `SELECT * FROM message WHERE activity_id = ? and message_id = ?`,
        [activity_id, message_id],
        (err: any, results: any) => {
          if (err) {
            console.error(err);
            res.status(500).json('Error getting message');
          } else {
            res.status(200).json(results[0]);
          }
        }
      );
    }
  });
};

export const getMessagesByActivity = (req: Request, res: Response) => {
  const { activity_id } = req.query;
  // console.log(activity_id);
  const query = `
    SELECT *, name as member_name 
    FROM message 
    INNER JOIN member on message.member_id = member.member_id
    WHERE activity_id = ? 
    order by message_timestamp asc
  `;
  pool.query(query, [activity_id], (err: any, results: any) => {
    if (err) {
      console.error(err);
      res.status(500).json('Error getting messages');
    } else {
      res.status(200).json(results);
    }
  });
};
