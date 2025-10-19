// import { httpStatus } from "../../shared/utils/constants.js";
import { PDFParse } from "pdf-parse";
import fs from "fs";
import mammoth from "mammoth";
import csvParser from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";

class Extract {
  static async extractFromPDF(file: Express.Multer.File) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pdfDataPath = path.join(__dirname, "../../assets/addendum.pdf");

    // const buffer = fs.readFileSync(file.buffer);
    // const parser = new PDFParse({ data: file.buffer });

    const buffer = fs.readFileSync(pdfDataPath);
    const parser = new PDFParse({ data: buffer });

    // parser.getText().then((result) => {
    //   console.log(result.text);
    // });

    const info = await parser.getInfo({ parsePageInfo: true });
    await parser.destroy();

    console.log(`Total pages: ${info.total}`);
    console.log(`Title: ${info.info?.Title}`);
    console.log(`Author: ${info.info?.Author}`);

    // Links, pageLabel, width, height (when `parsePageInfo` is true)
    console.log(`Per-page information: ${info.pages}`);
    info.pages.map((info) => console.log({ info })  );
    return { cleanPdf: "cleanPdf" };
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
