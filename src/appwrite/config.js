import { Client, Databases, ID, Query } from "appwrite"; // Add Query for filtering
import conf from "../conf/conf";

export class ListingService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
  }

  // ✅ Create a listing with userId
  async createListing({ title, description, category, price, location, contact, imageIds = null, userId }) {
    try {
      const response = await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        ID.unique(),
        {
          title,
          description,
          category,
          price,
          location,
          contact,
          imageIds,
          userId, // ✅ Add userId to the document
        }
      );

      console.log("✅ Listing created:", response);
      return response;
    } catch (error) {
      console.error("❌ createListing error:", error);
      throw error;
    }
  }

  // ✅ Get all listings (optionally filter by userId)
  async getListings(queries = []) {
    try {
      const response = await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries // You can pass [Query.equal('userId', userId)] to filter
      );
      return response.documents;
    } catch (error) {
      console.error("❌ getListings error:", error);
      throw error;
    }
  }

  // ✅ Get single listing by ID
  async getListing(listingId) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        listingId
      );
    } catch (error) {
      console.error("❌ getListing error:", error);
      throw error;
    }
  }

  // ✅ Update a listing
  async updateListing(listingId, updatedData) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        listingId,
        updatedData // userId can be included in updatedData if needed
      );
    } catch (error) {
      console.error("❌ updateListing error:", error);
      throw error;
    }
  }

  // ✅ Delete a listing
  async deleteListing(listingId) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        listingId
      );
    } catch (error) {
      console.error("❌ deleteListing error:", error);
      throw error;
    }
  }
}

const listingService = new ListingService();
export default listingService;