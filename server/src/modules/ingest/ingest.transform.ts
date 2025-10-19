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
  static async Pdf() {}
  static async Docx() {}
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

    console.log(data);
    

    //     const response = await collection.insertMany(transformedData);
    //     console.log(`${response.insertedCount} CSV Data Successfully loaded to MongoDB.`);

    //   .catch((error) => {
    //     console.error('Failed to extract or load data into MongoDB:', error);
    //   });
    return "transform";
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
