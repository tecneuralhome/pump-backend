/*
Project : Solana Pump
FileName : index.ts
Author : jeyakumar
File Created : 02/01/2025
CopyRights : jeyakumar
Purpose : This is the main file which is first executed when running nodejs application through command line. It will load all relevant packages and depedencies for API request.
*/

import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"
import mongoose from 'mongoose';
import user from "./routes/user"
import upload from "./routes/upload"
import swaggerJsDoc from "swagger-jsdoc";
import axios from "axios";
import cron from "node-cron";

dotenv.config();

const app: Express = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/images'));

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONOGO_URI || "";

mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo db connected successfully")
})

let page = 0

cron.schedule('*/20 * * * * *', () => {
  processPriceHistory()
});

async function processPriceHistory() {
  try {
      const result = await axios.get(process.env.APP_MAIN_URL + "/api/token-memcoinprice?page="+page);
      console.log("processPriceHistory result ", result.data)
      if(result.data.status) {
          page = page + 1
      } else {
          page = 0;
      }
  } catch (error) {
      console.log("processPriceHistory ",error)
      page = 0
  }
}


app.use("/v1/user", user);
app.use("/v1/upload", upload);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Solana Pump',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'], // files containing annotations as above
};

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Solana pump API')
})

const swaggerSpec = swaggerJsDoc(options);

app.get('/v1/api-docs', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


/*
* Below lines used to handle invalid api calls
*/
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send("Sorry can't find that!")
})

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});