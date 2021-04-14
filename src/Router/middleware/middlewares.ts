import { Router, Request, Response, NextFunction } from "express";
import ormconfig from "../../ormconfig";
import { Connection, createConnection } from "typeorm";

const router = Router();

const connect = (req: Request, res: Response, next: NextFunction, connection: Connection) => {
  createConnection(ormconfig)
    .then((db_connection) => {
      connection = db_connection
    })
    .catch((e) => res.json({ error: e }));
};

export { connect };
