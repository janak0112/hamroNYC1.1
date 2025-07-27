import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
  .setEndpoint(conf.appWriteUrl)
  .setProject(conf.appWriteProjectId);
const storage = new Storage(client);

/**
 * Uploads a file to Appwrite Storage.
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - Returns the uploaded file ID.
 */
const uploadFile = async (file) => {
  try {
    const res = await storage.createFile(
      conf.appWriteBucketId,
      ID.unique(),
      file
    );
    return res.$id;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};

export default uploadFile;
