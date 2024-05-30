/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '@/model/init';
import { nowDate } from '@/utils/nowDate';

// get 20 activities data
export const getActivityAll = async (req: Request, res: Response) => {
  // console.log('getActivityAll');
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


export const getActivityById = async (req: Request, res: Response) => {
  const { activity_id } = req.query;

  const query = 'SELECT * FROM activity WHERE activity_id = ?';
  const values = [activity_id];

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
};

export const joinActivity = async (req: Request, res: Response) => {
  const { activity_id, member_id } = req.body;

  const query = 'INSERT INTO activity_role (activity_id, member_id) VALUES (?, ?)';
  const values = [activity_id, member_id];

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
};

export const createActivity = async (req: Request, res: Response) => {
  console.log('createActivity');
  const payload = req.body.params.payload;
  const dates = req.body.params.dates;
  console.log(dates);
  const dates_new = [
    new Date(dates[0]),
    new Date(dates[1]),
    new Date(dates[2]),
    new Date(dates[3]),
  ];

  const timestamp = nowDate();

  const query = `
      INSERT INTO activity
      (activity_id,
      hoster_id,
      activity_content,
      title,
      applying_reason,
      event_start_timestamp,
      event_end_timestamp,
      register_start_timestamp,
      register_end_timestamp,
      location,
      status,
      traffic_capacity,
      member_capacity,
      activity_tag,
      activity_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  const activity_type = req.body.params.isOfficial ? 'official' : 'non-official';
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error(err);
      res.status(400).json(err);
    } else {
      connection.query(
        query,
        [
          100,
          100,
          payload.activity_content,
          payload.title,
          payload.applying_reason,
          dates_new[0],
          dates_new[1],
          dates_new[2],
          dates_new[3],
          'England',
          'reviewing',
          payload.traffic_capacity,
          payload.member_capacity,
          'tag',
          activity_type,
        ],
        (err: any, rows: any) => {
          if (err) {
            console.error(err);
            res.status(400).json(err);
          }
          res.status(200).json(rows);
          connection.release();
        }
      );
    }
  });
};

export const getActivityMember = async (req: Request, res: Response) => {
  const { activity_id } = req.query;
  const query = `
    select m.name, m.member_id, ar.activity_role
    from activity_role as ar
    inner join member as m on ar.member_id = m.member_id
    where ar.activity_id = ? and ar.activity_role = 'participant';
    `;
  const values = [activity_id];
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
};

export const getActivityCapacity = async (req: Request, res: Response) => {
  const { activity_id } = req.query;
  const query = `
    select count(*) as number_of_participant
    from activity_role
    where activity_id = ?;
    `;
  const values = [activity_id];
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      console.error(err);
    } else {
      connection.query(query, values, (err: any, rows: any) => {
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
