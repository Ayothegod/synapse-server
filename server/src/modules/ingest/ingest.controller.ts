import { httpStatus } from "@/shared/utils/constants";
import { ApiResponse } from "@/core/middlewares/ApiResponse";
import { Request, Response } from "express";
import { connectors } from "./ingest.transform";

interface Source {
  source: "pdf" | "docx" | "csv"; // "email" | "notion" | "drive"
}

class IngestController {
  static async connect(req: Request<Source>, res: Response) {
    // const data = await req.file();
    // const filePath = path.join("/tmp", data.filename);
    // await fs.promises.writeFile(filePath, await data.toBuffer());

    // const ext = path.extname(data.filename).replace(".", "");
    // const doc = await processFile(filePath, ext);

    const { source } = req.params;

    const connector = connectors[source];
    // if (!connector) return reply.code(400).send({ error: "Unknown source" });

    const result = await connector("data.csv");
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

    // reply.send({ message: `${source} ingested`, doc });
    res.status(200).json(new ApiResponse(httpStatus.ok, null, "msg"));
  }
}

export default IngestController;
