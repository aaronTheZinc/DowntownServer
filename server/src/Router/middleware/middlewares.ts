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
  console.log('middleware call')
  const { authId } = req.query
  console.log(authId)
  const isAuth = await validateUser(authId as string)
  console.log(isAuth)
    isAuth? next(): res.json({error:'Authentication Failed.'})
}
export { isConnected, authenticatedByAuthId };
