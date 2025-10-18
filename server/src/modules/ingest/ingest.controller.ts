import { httpStatus } from "@/shared/utils/constants";
import { ApiResponse } from "@/core/middlewares/ApiResponse";
import { Request, Response } from "express";
import { connectors } from "./ingest.service";

type Source = "docs" | "email"

class IngestController {
  static async connect(req: Request, res: Response) {
    // const { email, password } = req.body;
    // const { source }  = req.params 
    const source: Source = "docs"


    const connector = connectors[source];
    console.log(connector);
    
    // if (!connector) return reply.code(400).send({ error: "Unknown source" });

    // const result = await connector(await req.file(), req.query);
    // const doc = await saveDocument(result);
    // await emitEvent(`${source}.ingested`, doc);

    // reply.send({ message: `${source} ingested`, doc });

    res.status(200).json(new ApiResponse(httpStatus.ok, null, "msg"));
  }
}

export default IngestController;
