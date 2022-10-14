import * as dotenv from "dotenv";
import app from "./app";
import https from "https";
import fs from "fs";

dotenv.config();

const port = process.env.PORT || 3000;
// server.js

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(port);