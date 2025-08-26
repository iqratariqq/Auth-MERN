import express from "express";
import dotenv from "dotenv";
import {ConnectDB} from "./src/config/ConnectDB.js";
import router from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config();
const app = express();
const port=process.env.port||3000



app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true
}));

// Preflight requests (OPTIONS) ko handle karne ke liye
app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Auth API");
});

app.use("/api/auth",router);


ConnectDB().then(() => {
  app.listen(port, () => {
    console.log(`app is listning in http://localhost:${port}`);
  });
});
