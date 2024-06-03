import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '@/model/init';
import { nowDate } from '@/utils/nowDate';

export const postTransaction = async (req: Request, res: Response) => {
    console.log('postTransaction');
    const member_id = req.body.params.member_id;
    const name = req.body.params.name;
    const traffic = req.body.params.traffic || 0;

    const subtract_query = `
        UPDATE member
        SET traffic = traffic - ?
        WHERE member_id = ?;
        `;
    
    const add_query = `
        UPDATE member
        SET traffic = traffic + ?
        WHERE name = ?;
        `;
    pool.getConnection((err: any, connection: any) => {
      if (err) {
        console.error(err);
        res.status(400).json(err);
      } else {
        connection.query(subtract_query, [traffic, member_id], (err: any, rows: any) => {
            if (err) {
                console.error(err);
                res.status(400).json(err);
            }
            connection.release();
        });
        connection.query(add_query, [traffic, name], (err: any, rows: any) => {
            if (err) {
                console.error(err);
                res.status(400).json(err);
            }
            res.status(200).json({"success": true});
            connection.release();
        });
      }
    });

};