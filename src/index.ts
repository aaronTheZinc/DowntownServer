
import { createConnection } from "typeorm";
import express, {Request, Response} from 'express'
createConnection().then(
  connection => console.log("Server Up And Running!", connection)
).catch(e => console.log(e))

