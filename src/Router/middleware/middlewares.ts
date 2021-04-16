import { Router, Request, Response, NextFunction } from "express";
import { Connection, createConnection } from "typeorm";
import Database from "../../Database/connect";

const router = Router();

const isConnected = (req: Request, res: Response, next: NextFunction) => {
  const { databaseConnection } = Database;
  if (databaseConnection.connection) {
    next();
  } else {
    res.json({
    error: 'Fatal Database Connection...'
    })
  }
};
export { isConnected };
