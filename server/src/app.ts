import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { ApiResponse } from "./core/middlewares/ApiResponse.js";
import { asyncHandler } from "./core/middlewares/asyncHandler.js";
import { errorHandler } from "./core/middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// job.start()
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));

app.get(
  "/api/v1/test",
  asyncHandler(async (req: Request, res: Response) => {
    // console.log(req.session);

    return res
      .status(200)
      .json(new ApiResponse(200, "OK", "/ route working successfully"));
  })
);

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler as any);

export default app;
