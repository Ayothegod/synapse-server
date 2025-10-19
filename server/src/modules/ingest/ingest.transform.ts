import Extract from "./ingest.extract";
import { v4 as uuidv4 } from "uuid";
interface UnifiedDoc {
  id: string;
  source: string; // "csv" | "pdf" | "docx"
  fileName: string;
  title: string; // filename or document title
  content: string; // plain text
  metadata: {
    page?: number; // for pdf
    row?: number; // for csv
    author?: string;
    createdAt?: string;
    [key: string]: any;
  };
}

class Transform {
  static async Pdf(file: Express.Multer.File) {

    const { cleanPdf } = await Extract.extractFromPDF(file);

//     function chunkText(text, maxLength = 100) {
//   const chunks = [];
//   for (let i = 0; i < text.length; i += maxLength) {
//     chunks.push(text.slice(i, i + maxLength));
//   }
//   return chunks;
// }

    //     pdfPages.forEach((page, i) => {
    //   docs.push({
    //     id: uuid(),
    //     source: "pdf",
    //     title: fileName,
    //     content: page.text,
    //     metadata: { page: i + 1 }
    //   });
    // });
    return cleanPdf
  }
  static async Docx() {
    //     paragraphs.forEach((text, i) => {
    //   docs.push({
    //     id: uuid(),
    //     source: "docx",
    //     title: fileName,
    //     content: text,
    //     metadata: { paragraph: i }
    //   });
    // });
  }
  static async Csv(file: Express.Multer.File) {
    const data: UnifiedDoc[] = [];

    const { cleanCsv } = await Extract.extractFromCsv(file);
    // console.log(cleanCsv);

    for (const [i, row] of cleanCsv.entries()) {
      const csvRow: UnifiedDoc = {
        id: uuidv4(),
        source: "csv",
        fileName: file?.originalname as string,
        title: Object.keys(row).join(" ").trim(),
        content: Object.values(row).join(" "),
        metadata: {
          page: 1,
          row: i + 1,
          createdAt: new Date().toDateString(),
        },
      };
      data.push(csvRow);
    }

    return data;
  }
}

export const connectors = {
  pdf: Transform.Pdf,
  docx: Transform.Docx,
  csv: Transform.Csv,
  // email: Connect.ingestEmail,
  // drive: Connect.ingestDrive,
  // notion: Connect.ingestNotion,
};

// Employees
//   {
//     id: '09454441-e301-4a62-a61a-bb53dace42a1',
//     source: 'csv',
//     fileName: 'employees.csv',
//     title: 'id name department salary',
//     content: '3 Charlie HR 45000',
//     metadata: { page: 1, row: 3, createdAt: 'Sun Oct 19 2025' }
//   }

// Fashion
//   {
//     id: 'a3d8c199-e0fe-49fb-b689-800661fd4231',
//     source: 'csv',
//     fileName: 'styles.csv',
//     title: 'id gender masterCategory subCategory articleType baseColour season year usage productDisplayName',
//     content: '43967 Women Personal Care Fragrance Perfume and Body Mist Red Spring 2017 Casual DKNY Women Red Delicious Perfume',
//     metadata: { page: 1, row: 100, createdAt: 'Sun Oct 19 2025' }
//   },
