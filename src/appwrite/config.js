import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

// Initialize Appwrite client and Databases
const client = new Client();
const databases = new Databases(client);

client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId);

// Validate input data
const validateListingData = (data, isJob = false) => {
  const requiredFields = isJob
    ? ["title", "description", "category", "salary", "location", "contact", "jobType", "experienceRequired", "company", "user"]
    : ["title", "description", "price", "location", "contact", "bedrooms", "bathrooms", "user"];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (isJob && !["full-time", "part-time", "temporary"].includes(data.jobType)) {
    throw new Error("Invalid jobType. Must be 'full-time', 'part-time', or 'temporary'.");
  }

  if (data.price && data.price < 0) {
    throw new Error("Price cannot be negative.");
  }
  if (data.salary && data.salary < 0) {
    throw new Error("Salary cannot be negative.");
  }
  if (data.bedrooms && data.bedrooms < 1) {
    throw new Error("Bedrooms must be at least 1.");
  }
  if (data.bathrooms && data.bathrooms < 1) {
    throw new Error("Bathrooms must be at least 1.");
  }
  if (data.experienceRequired && data.experienceRequired < 0) {
    throw new Error("Experience required cannot be negative.");
  }
};

// Create a room listing
export const createRoomListing = async (data) => {
  try {
    validateListingData(data);
    const response = await databases.createDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdRooms,
      ID.unique(),
      { ...data, category: "room" }
    );
    console.log("✅ Room listing created:", response);
    return response;
  } catch (error) {
    console.error("❌ createRoomListing error:", error);
    throw new Error(error.message || "Failed to create room listing.");
  }
};

// Create a job listing
export const createJobListing = async (data) => {
  try {
    validateListingData(data, true);
    const response = await databases.createDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdJobs,
      ID.unique(),
      { ...data, category: "job" }
    );
    console.log("✅ Job listing created:", response);
    return response;
  } catch (error) {
    console.error("❌ createJobListing error:", error);
    throw new Error(error.message || "Failed to create job listing.");
  }
};

// Get all room listings (optionally filter by userId)
export const getRoomListings = async (userId = null) => {
  try {
    const queries = [Query.equal("publish", true)];
    if (userId) {
      queries.push(Query.equal("user", userId));
    }
    const response = await databases.listDocuments(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdRooms,
      queries
    );
    return response.documents;
  } catch (error) {
    console.error("❌ getRoomListings error:", error);
    throw new Error(error.message || "Failed to fetch room listings.");
  }
};

// Get all job listings (optionally filter by userId)
export const getJobListings = async (userId = null) => {
  try {
    const queries = [Query.equal("publish", true)];
    if (userId) {
      queries.push(Query.equal("user", userId));
    }
    const response = await databases.listDocuments(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdJobs,
      queries
    );
    return response.documents;
  } catch (error) {
    console.error("❌ getJobListings error:", error);
    throw new Error(error.message || "Failed to fetch job listings.");
  }
};

// Get single room listing by ID
export const getRoomListing = async (listingId) => {
  try {
    const response = await databases.getDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdRooms,
      listingId
    );
    return response;
  } catch (error) {
    console.error("❌ getRoomListing error:", error);
    throw new Error(error.message || "Failed to fetch room listing.");
  }
};

// Get single job listing by ID
export const getJobListing = async (listingId) => {
  try {
    const response = await databases.getDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdJobs,
      listingId
    );
    return response;
  } catch (error) {
    console.error("❌ getJobListing error:", error);
    throw new Error(error.message || "Failed to fetch job listing.");
  }
};

// Update a room listing
export const updateRoomListing = async (listingId, updatedData) => {
  try {
    validateListingData(updatedData);
    const response = await databases.updateDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdRooms,
      listingId,
      updatedData
    );
    console.log("✅ Room listing updated:", response);
    return response;
  } catch (error) {
    console.error("❌ updateRoomListing error:", error);
    throw new Error(error.message || "Failed to update room listing.");
  }
};

// Update a job listing
export const updateJobListing = async (listingId, updatedData) => {
  try {
    validateListingData(updatedData, true);
    const response = await databases.updateDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdJobs,
      listingId,
      updatedData
    );
    console.log("✅ Job listing updated:", response);
    return response;
  } catch (error) {
    console.error("❌ updateJobListing error:", error);
    throw new Error(error.message || "Failed to update job listing.");
  }
};

// Delete a room listing
export const deleteRoomListing = async (listingId) => {
  try {
    const response = await databases.deleteDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdRooms,
      listingId
    );
    console.log("✅ Room listing deleted:", response);
    return response;
  } catch (error) {
    console.error("❌ deleteRoomListing error:", error);
    throw new Error(error.message || "Failed to delete room listing.");
  }
};

// Delete a job listing
export const deleteJobListing = async (listingId) => {
  try {
    const response = await databases.deleteDocument(
      conf.appWriteDatabaseId,
      conf.appWriteCollectionIdJobs,
      listingId
    );
    console.log("✅ Job listing deleted:", response);
    return response;
  } catch (error) {
    console.error("❌ deleteJobListing error:", error);
    throw new Error(error.message || "Failed to delete job listing.");
  }
};

// Backward-compatible createListing (uses room collection by default)
export const createListing = async (data) => {
  console.warn("⚠️ createListing is deprecated. Use createRoomListing or createJobListing instead.");
  return createRoomListing(data);
};

const listingService = {
  createListing, // Kept for backward compatibility
  createRoomListing,
  createJobListing,
  getRoomListings,
  getJobListings,
  getRoomListing,
  getJobListing,
  updateRoomListing,
  updateJobListing,
  deleteRoomListing,
  deleteJobListing,
};

export default listingService;