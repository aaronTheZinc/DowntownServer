import { createUser } from "../Database/index";
import { Connection } from "typeorm";

const insertUser = async (connection: Connection): Promise<void> => {
  console.log("User is Being Created...");
  const result = await createUser(connection);
  console.log("client did insert =>", result);
};

export {insertUser}