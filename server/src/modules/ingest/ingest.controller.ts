import { httpStatus } from "@/shared/utils/constants";
import { ApiResponse } from "@/core/middlewares/ApiResponse";
import { Request, Response } from "express";
import { connectors } from "./ingest.transform";
import { ApiError } from "@/core/errors/ApiError";
import fs from "fs";
import { mastraClient } from "@/core/config/mastra";

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

    const filePath = file.path;
    if (source !== file.mimetype.split("/")[1]) {
      fs.unlink(filePath, (err) => {
        if (err) console.error(err);
        else null;
      });
      throw new ApiError(
        httpStatus.forbidden,
        "File type not the same as connector option!"
      );
    }

    const connector = connectors[source];
    if (!connector)
      throw new ApiError(
        404,
        "No such connector exists, pick a valid connector to get started."
      );

    const result = await connector(file);

    // delete file from disk
    fs.unlink(filePath, (err) => {
      if (err) console.error(err);
      else null;
    });

    const tool = await mastraClient.getTool("ingest-tool");
    const agent = await mastraClient.getAgent("orchestratorAgent");

    // const toolResult = await tool.execute({
    //   data: {
    //     input: result
    //   },
    //   runId: "test-1",
    // });
    
    const response = await agent.generate({
      messages: [
        {
          role: "user",
          content: `
          {
 input: [
    {
      id: "280d2864-cf63-447b-a20a-168e2035819f",
      source: "csv",
      fileName: "data.csv",
      title: "NAME CAREER _2",
      content: "REV ONUCHE  SOFTWARE DEVELOPER ",
      metadata: {
        page: 1,
        row: 1,
        createdAt: "Mon Oct 20 2025",
      }]}
        `,
      },
    ],
    threadId: "thread-1", // Optional: Thread ID for conversation context
    resourceId: "resource-1", // Optional: Resource ID
    output: {},
  });
  // activeTools: ["ingest-tool"],
  console.log(response);

    res
      .status(201)
      .json(
        new ApiResponse(httpStatus.ok, { result }, "workflow.extract.completed")
      );
  }
}

export default IngestController;

// {
//     "totalPages": 2,
//     "Title": "National Youth Service Corps",
//     "links": [],
//     "text": "ADDENDUM\nN.B* Prospective Corps Members are strongly advised Not to travel at Night\ni. rmal ethics will not be tolerated\nvii. Beware ofe to come along with a signed copy of this Addendum.\n_______________________________________________\nAdebisi Ayomide Idris\nSign and Date\n22/04/2025, 16:56 \tNational Youth Service Corps\nhttps://portal.nysc.org.ng/nysc1/CorpHome.aspx \t2/2\n-- 2 of 2 --"
//   },
