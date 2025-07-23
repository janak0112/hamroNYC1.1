import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.storage = new Storage(this.client);
  }

  // ✅ Upload file and return its ID
  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );

      return response.$id;
    } catch (error) {
      console.error("uploadFile error:", error);
      throw error;
    }
  }

  // ✅ Get file preview URL
  getFilePreview(fileId, width = 600, height = 600) {
    try {
      return this.storage.getFilePreview(
        conf.appWriteBucketId,
        fileId,
        width,
        height
      );
    } catch (error) {
      console.error("getFilePreview error:", error);
      return null;
    }
  }

  // ✅ Delete a file
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        conf.appWriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("deleteFile error:", error);
      throw error;
    }
  }
}

const storageService = new StorageService();
export default storageService;
