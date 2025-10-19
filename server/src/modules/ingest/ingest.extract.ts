// import { httpStatus } from "../../shared/utils/constants.js";
import { PDFParse } from "pdf-parse";
import fs from "fs";
import mammoth from "mammoth";
import csvParser from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";
import { ApiError } from "@/core/errors/ApiError";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const pdfDataPath = path.join(__dirname, "../../assets/addendum.pdf");

interface Link {
  text: string;
  url: string;
}

class Extract {
  static async extractFromPDF(file: Express.Multer.File) {
    try {
      const buffer = fs.readFileSync(file.path);
      const parser = new PDFParse({ data: buffer });

      const info = await parser.getInfo({ parsePageInfo: true });
      const textResult = await parser.getText();
      const result = await parser.getTable();
      await parser.destroy();

      const links: Link[] = [];
      info.pages.map((info) => info.links.map((link) => links.push(link)));

      const tables: string[] = [];
      for (const page of result.pages) {
        if (!page.tables) continue;

        for (const [tableIndex, table] of page.tables.entries()) {
          const tableText = table.map((row) => tables.push(row));
        }
      }

      const data = {
        totalPages: info.total,
        Title: info.info?.Title,
        Author: info.info?.Author,
        links,
        // tables: tables?.filter((r) => r.length > 1),
        text: textResult.text.trim(),
      };
      return { cleanPdf: data };
    } catch (error) {
      console.log({ error });

      throw new ApiError(404, "Error while parsing pdf file!");
    }
  }
  static async extractFromDocx(filePath?: any) {
    //     const result = await mammoth.extractRawText({ path: filePath });
    // return {
    //   text: result.value,
    //   metadata: { source: "docx" },
    // };
    return "docx";
  }
  static async extractFromCsv(file: Express.Multer.File) {
    const cleanCsv: any = [];

    const stream = fs.createReadStream(file.path).pipe(csvParser());
    for await (const item of stream) {
      cleanCsv.push(item);
    }

    return { cleanCsv };
  }
  // static async ingestEmail(payload?: any) {
  //   return "email";
  // }
  // static async ingestDrive() {
  //   return "drive";
  // }
  // static async ingestNotion() {
  //   return "notion";
  // }
}
export default Extract;
