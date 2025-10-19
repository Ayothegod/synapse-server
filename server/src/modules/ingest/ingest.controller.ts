import { httpStatus } from "@/shared/utils/constants";
import { ApiResponse } from "@/core/middlewares/ApiResponse";
import { Request, Response } from "express";
import { connectors } from "./ingest.transform";
import { ApiError } from "@/core/errors/ApiError";
import fs from "fs";

interface Source {
  source: "pdf" | "docx" | "csv"; // "email" | "notion" | "drive"
}

class IngestController {
  static async connect(req: Request<Source>, res: Response) {
    const { source } = req.params;
    const file = req.file;
    console.log({ file });

    if (!file)
      throw new ApiError(
        404,
        "No file to ingest, choose a file and try again!"
      );

    const connector = connectors[source];
    if (!connector)
      throw new ApiError(
        404,
        "No such connector exists, pick a valid connector to get started."
      );

    const result = await connector(file);
    console.log(connector, result);
    // const doc = await saveDocument(result);
    // await emitEvent(`${source}.ingested`, doc);

    // const transformed = {
    //   text: extracted.text.trim(),
    //   source: extracted.metadata.source,
    //   metadata: extracted.metadata,
    // };
    //     const doc = await saveDocument(transformed);
    // await emitEvent("document.ingested", doc);

    // delete file from disk
    const filePath = file.path;
    fs.unlink(filePath, (err) => {
      if (err) console.error(err);
      else null
    });

    res.status(200).json(new ApiResponse(httpStatus.ok, null, "msg"));
  }
}

export default IngestController;
