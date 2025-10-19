// import { httpStatus } from "../../shared/utils/constants.js";
import { PDFParse } from "pdf-parse";
import fs from "fs";
import mammoth from "mammoth";
import csvParser from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";

class Extract {
  static async extractFromPDF(filePath?: string) {
    //     const buffer = fs.readFileSync(filePath);
    // const data = await pdfParse(buffer);
    // return {
    //   text: data.text,
    //   metadata: { pages: data.numpages, source: "pdf" },
    // };
    return "pdf";
  }
  static async extractFromDocx(filePath?: any) {
    //     const result = await mammoth.extractRawText({ path: filePath });
    // return {
    //   text: result.value,
    //   metadata: { source: "docx" },
    // };
    return "docx";
  }
  static async extractFromCsv(fileName?: string) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const csvDataPath = path.join(__dirname, "../../assets/sales.csv");

    const cleanCsv: any = [];
    const stream = await fs.createReadStream(csvDataPath).pipe(csvParser());
    for await (const item of stream) {
      cleanCsv.push(item);
    }

    // console.log(cleanCsv);
    return {cleanCsv}
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
export default Extract

