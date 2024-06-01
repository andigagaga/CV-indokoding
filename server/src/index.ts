import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import userRoute from "./route/user/UserAuthRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 3000;

    const router = express.Router();

    app.use(cors());
    app.use(express.json());
    app.use("api/v1", router);

    app.use("/api/v1", userRoute);

    app.get("/", (req: Request, res: Response) => {
      res.send("Express App is running!");
    });

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
