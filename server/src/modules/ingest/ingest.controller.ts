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

    if (!file)
      throw new ApiError(
        httpStatus.badRequest,
        "No file to ingest, choose a file and try again!"
      );

    if (source !== file.mimetype.split("/")[1])
      throw new ApiError(
        httpStatus.forbidden,
        "File type not the same as connector option!"
      );

    const connector = connectors[source];
    if (!connector)
      throw new ApiError(
        404,
        "No such connector exists, pick a valid connector to get started."
      );

    const result = await connector(file);

    // delete file from disk
    const filePath = file.path;
    fs.unlink(filePath, (err) => {
      if (err) console.error(err);
      else null;
    });

    res
      .status(201)
      .json(
        new ApiResponse(httpStatus.ok, result, "workflow.extract.completed")
      );
  }
}

export default IngestController;
