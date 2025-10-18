import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string({ required_error: "fullname is required" })
    .min(3, "fullname must be at least 3 characters")
});

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