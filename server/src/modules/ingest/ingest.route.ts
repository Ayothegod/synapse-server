import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import IngestController from "./ingest.controller.js";
import { upload } from "@/core/config/multer.js";

const router = Router();

router.post(
  "/:source",
  upload.single('file'),
  // validate(loginSchema),
  asyncHandler(IngestController.connect)
);

export default router;