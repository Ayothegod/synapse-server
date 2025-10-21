import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { ApiResponse } from "./core/middlewares/ApiResponse.js";
import { asyncHandler } from "./core/middlewares/asyncHandler.js";
import { errorHandler } from "./core/middlewares/error.middleware.js";
import ingestRoutes from "./modules/ingest/ingest.route.js";
import { mastra } from "./mastra/index.js";

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
  "/api/v1/health",
  asyncHandler(async (req: Request, res: Response) => {
    return res
      .status(200)
      .json(new ApiResponse(200, "OK", "/ route working successfully"));
  })
);

app.get(
  "/api/v1/orchestrator",
  asyncHandler(async (req: Request, res: Response) => {
    const { city } = req.query as { city?: string };
    if (!city) {
      return res.status(400).send("Missing 'city' query parameter");
    }

    const agent = mastra.getAgent("orchestratorAgent");

    // try {
    //   const result = await agent.generate(
    //     `What's the weather like in ${city}?`
    //   );
    //   // res.send(result.text);
    //   return res.json(new ApiResponse(200, result.text, ""));
    // } catch (error) {
    //   console.error("Agent error:", error);
    //   res.status(500).send("An error occurred while processing your request");
    // }
    res.send("result");
  })
);

app.use("/api/v1/ingest", ingestRoutes);

app.use(errorHandler as any);

export default app;
