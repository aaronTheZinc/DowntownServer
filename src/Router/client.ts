import express, { Router, Request, Response, NextFunction } from "express";
import { Connection, createConnection } from "typeorm";
import { insertUser } from "../Actions/databaseActions";
import { connect } from "./middleware/middlewares";

const router = Router()

router.get('/test', (req: Request, res: Response) => {
    res.json({
        message: 'Downtown Api Is Up And Running.....'
    })
})



export default router;
