// import { httpStatus } from "../../shared/utils/constants.js";

class Connect {
  static async extractFromPDF(payload: any) {
    return "pdf"
  }
  static async extractFromDocx(payload: any) {
    return "docx"
  }
  static async ingestEmail(payload: any) {
    return "email"
  }
  static async ingestDrive() {
    return "drive"
  }
  static async ingestNotion() {
    return "notion"
  }
}
// export default Connect

export const connectors = {
  docs: async (payload: any, query: { type: "pdf" | "docx" }) => {
    const { type } = query;
    if (type === "pdf") return Connect.extractFromPDF(payload);
    if (type === "docx") return Connect.extractFromDocx(payload);
    throw new Error("Unsupported document type");
  },
  email: Connect.ingestEmail,
  drive: Connect.ingestDrive,
  notion: Connect.ingestNotion,
};

// const fs = require('fs');
// const csvParser = require('csv-parser');
// const { MongoClient } = require('mongodb');
// const csvDataPath = 'data.csv';

// require('dotenv').config();

// // Extract Phase

// const extractData = (csvDataPath) => {
//   return new Promise((resolve, reject) => {
//     const data = [];

//     fs.createReadStream(csvDataPath)
//       .pipe(csvParser())
//       .on('data', (item) => {
//         data.push(item);

//       })
//       .on('end', () => {
//         resolve(data);
//       })

//       .on('error', (error) => {
//         reject(error);
//       });
//   });
// };

// // Transform Phase
// const transformData = (csvData) => {
//   return csvData.map((items) => ({
//     name: items.NAME.trim(), // Trim whitespace from the Name value
//     career: items.CAREER.trim(),  // Trim whitespace from the career value
//   }));
// };

// const dbUrl = process.env.MONGODB_URL;

// const connectionString = `${dbUrl}`;
// const databaseName = process.env.MONGODB_DATABASE || 'etldb';
// const collectionName = 'users';

// // Load Phase
// const loadData = async (transformedData, databaseName, collectionName, connectionString) => {
//   const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {

//     await client.connect();
//     console.log('Connected to MongoDB successfully.');

//     const db = client.db(databaseName);
//     const collection = db.collection(collectionName);

//     const response = await collection.insertMany(transformedData);
//     // console.log("RESPONSE", response);
//     console.log(`${response.insertedCount} CSV Data Successfully loaded to MongoDB.`);

//   } catch (error) {
//     console.error('Error Connecting MongoDB', error);
//   }

//   await client.close();
// };

// extractData(csvDataPath)
//   .then((rawData) => {
//     const transformedData = transformData(rawData);
//     return loadData(transformedData, databaseName, collectionName, connectionString);
//   })
//   .catch((error) => {
//     console.error('Failed to extract or load data into MongoDB:', error);
//   });
