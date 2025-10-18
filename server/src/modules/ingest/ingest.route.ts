// IngestAgent
// Input: file / URL / connector event

// Tasks: extract text (pdfminer, tesseract for images), split into chunks (chunk size + overlap), attach metadata

// Output: raw chunks → posts chunk.created events

// ⚙️ 2. Ingestion Service (ETL Pipeline)
// This is your first backend service.
// Responsibilities:
// Subscribe to SourceIngested events.
// Extract text (use libraries like pdf-parse, mammoth, html-to-text).
// Normalize: add metadata (title, author, timestamp).
// Store clean text in Postgres (documents table).
// Emit DocumentReady event → triggers next stage.
// ```json 
// Flow:  
// Raw File → ExtractText() → Normalize() → SaveToPostgres() → Emit(DocumentReady)
// ```

import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import IngestController from "./ingest.controller.js";

const router = Router();

router.post(
  "/:source",
  // validate(loginSchema),
  asyncHandler(IngestController.connect)
);

export default router;