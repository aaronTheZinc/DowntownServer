import express, { Router, Request, Response, NextFunction } from "express";
import { Connection, createConnection } from "typeorm";
import { insertUser, fetchClient } from "../Actions/client";
import { isConnected } from "./middleware/middlewares";
import { Client } from "../models/types";
import Database from "../Database/connect";



const router = Router();

router.use(express.json());
router.use((req: Request, res: Response, next: NextFunction) =>
  isConnected(req, res, next)
);

router.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "Downtown Api Is Up And Running.....",
  });
});

router.get("/", (req: Request, res: Response) => {
  res.send("<h1><b>Client Route</b></h1>");
});

router.post("/create_user", async (req: Request, res: Response) => {
  console.log("--->", Database.databaseConnection);
  if (!Database.databaseConnection.isConnect) {
    res.json({
      internalErr: "Database Connection Failed... Please Retry",
    });
  } else {
    const { client } = req.body;
    const clientData = client as Client;
    const didInsert = await insertUser(
      Database.databaseConnection.connection,
      clientData
    );
    res.json({
      status: 500,
      message: "User Created!",
    });
    console.log("Insertion Result =>", didInsert);
  }
});

router.get("/get_client", async (req: Request, res: Response) => {
  const { uid } = req.query;
  const client = await fetchClient(uid as string);
  res.json({
    client: client,
  });
});

router.post("/test", async (req: Request, res: Response) => res.json({
  data: req.body
}));

export default router;
