import { Router, Request, Response, NextFunction } from "express";
import { Connection, createConnection } from "typeorm";
import { validateUser } from '../../classes/auth'

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

const authenticatedByAuthId = async(req: Request, res: Response, next: NextFunction)=> {
  const { authId } = req.query
  const isAuth = await validateUser(authId as string)
    isAuth? next(): res.json({error:'Authentication Failed.'})
}
export { isConnected, authenticatedByAuthId };
