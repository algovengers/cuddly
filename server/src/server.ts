import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./errorhandlers/ErrorMiddleware";
// import connectDB from "./db/connect";
import { router } from "routes/router";

dotenv.config();

const app: Express = express();

// use CORS
app.use(
  cors({
    // origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    origin: "*",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// parse cookie
app.use(cookieParser());

// put routes
app.use("/api/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Of Cuddly");
});

// ERROR middleware (must be in last)
app.use(ErrorMiddleware);

const startServer = async () => {
  try {
    // await connectDB();

    const port = String(process.env.SERVER_PORT) || 5000;
    app.listen(port, () => {
      console.log(`Cuddly-server is listening on port ${port} ...`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
