import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";
import notes from "./routes/notes";
var cors = require('cors');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/notes", notes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3020, () => console.log("Running on localhost:3020"));
