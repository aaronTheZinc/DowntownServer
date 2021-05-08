import express, { Router, Request, Response, NextFunction } from "express";
import { Connection, createConnection } from "typeorm";
import { insertUser, fetchClient, getUserProfile } from "../Actions/client";
import { generateEphimeral } from "../Actions/stripe";
import { isConnected } from "./middleware/middlewares";
import { Client, ClientProfile } from "../models";
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
  res.send("<h1><b>Clients Route</b></h1>");
});

router.post("/create_user", async (req: Request, res: Response) => {
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
      status: 201,
      data: didInsert.data,
      message: "User Created!",
    });
    console.log("Insertion Result =>", didInsert);
  }
});

router.get("/get_user", async (req: Request, res: Response) => {
  const { authId } = req.query;
  const client = await fetchClient(authId as string);

  client.error
    ? res.json({ error: "An Error Ocurred!", message: "User Not Found" })
    : res.json({
        client: client,
      });
});

router.post("/test", async (req: Request, res: Response) =>
  res.json({
    data: req.body,
  })
);

router.get("/create_ephemeral", async (req: Request, res: Response) => {
  const { authId } = req.query;
  try {
    const { didSucceed, data, err } = await generateEphimeral(authId as string);

    didSucceed
      ? res.json(data)
      : res.json({ error: "An Error Occured!", message: err });
  } catch (e) {
    return res.json({
      error: "An Error Occured!",
      message: e,
    });
  }
});

// Appends Shop To User
router.post("/append_shop", (req: Request, res: Response) => {
  const { authId, shopName } = req.body;
  const { connection, isConnect } = Database.databaseConnection;
});

router.get("/user_profile", async (req: Request, res: Response) => {
  const { authId } = req.query;

  const Profile: ClientProfile = await getUserProfile(authId as string);

  !Profile.account404
    ? res.json({ profile: Profile })
    : res.json({ error: "An Error Occured!", message: "User Not Found" });
});
export default router;
