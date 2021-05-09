import express, { Router, Request, Response, NextFunction } from "express";
import { Connection, createConnection } from "typeorm";
import {
  insertUser,
  fetchClient,
  getUserProfile,
  AppendBookMark,
  RemoveBookmark
} from "../Actions/client";
import { generateEphimeral } from "../Actions/stripe";
import { isConnected, authenticatedByAuthId } from "./middleware/middlewares";
import { Client, ClientProfile } from "../models";
import Database from "../Database/connect";


const router = Router();

router.use(express.json());
router.use((req: Request, res: Response, next: NextFunction) =>
  isConnected(req, res, next)
);
router.use(
  async (req: Request, res: Response, next: NextFunction) =>
    await authenticatedByAuthId(req, res, next)
);
/*
!GET
?Test EndPoint
*/
router.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "Downtown Api Is Up And Running.....",
  });
});

/*
!GET
?Index Route
*/

router.get("/", (req: Request, res: Response) => {
  res.send("<h1><b>Clients Route</b></h1>");
});

/*
!Post
?Creates User
*/
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

/**
 *!GET
 ** Requires Auth Id
 *? Retrieves User
 */

router.get("/get_user", async (req: Request, res: Response) => {
  const { authId } = req.query;
  const client = await fetchClient(authId as string);

  client.error
    ? res.json({ error: "An Error Ocurred!", message: "User Not Found" })
    : res.json({
        client: client,
      });
});

/*
!Post
?Test EndPoint For Posting Data
*/
router.post("/test", async (req: Request, res: Response) =>
  res.json({
    data: req.body,
  })
);

/**
 * !Get
 **Requires Authentication Id
 *? Generates Stripe Key
 */

router.get("/create_ephemeral", async (req: Request, res: Response) => {
  const { authId } = req.query;
  try {
    const { didSucceed, data, err } = await generateEphimeral(
      authId!.toString()
    );

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

/**
 * !POST
 * *Requires Authentication Id
 * ? Binds A Shop To A User
 */
router.post("/bind_shop", (req: Request, res: Response) => {
  const { authId, shopName } = req.body;
  const { connection, isConnect } = Database.databaseConnection;
});

/**
 * !Get
 * *Requires Authentication Id
 * ? Retrieve Needed Data For Profile
 */
router.get("/user_profile", async (req: Request, res: Response) => {
  const { authId } = req.query;
  const Profile: ClientProfile = await getUserProfile(authId!.toString());

  !Profile.account404
    ? res.json({ profile: Profile })
    : res.json({ error: "An Error Occured!", message: "User Not Found" });
});

/**
 * !GET
 * *Requires Authentication Id && Product Id
 * ? Appends Product To Bookmarks Section
 */
router.get("/bookmark", async (req: Request, res: Response) => {
  const { authId, product } = req.query;
  authId || product
    ? null
    : res.json({
        error: "An Error Occured!",
        message: "Must include AuthId and Product",
      });
  // try {
  await AppendBookMark(authId!.toString(), product!.toString()).then(
    (result) => {
      result.didSucceed
        ? res.json(result)
        : res.json({
            error: "An Error Occured",
            message: "Failed To Bookmark",
          });
    }
  );
})

  router.get("/remove_bookmark", async (req: Request, res: Response) => {
    const { authId, product } = req.query;
    authId || product
      ? null
      : res.json({
          error: "An Error Occured!",
          message: "Must include AuthId and Product",
        });

     await RemoveBookmark(product?.toString()!, authId?.toString()!).then((result) => {
      result.didSucceed
      ? res.json(result)
      : res.json({
          error: "An Error Occured",
          message: "Failed To Remove Bookmark",
        });
     })  
  });

export default router;
