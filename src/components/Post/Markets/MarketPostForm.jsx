import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { uploadImage } from "../../../appwrite/StorageService"; // Import the upload function
import listingService from "../../../appwrite/config"; // Adjust path as needed
import authService from "../../../appwrite/auth"; // Adjust path for auth service

const MarketPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null); // Store selected image
  const [imageId, setImageId] = useState(null); // Store imageId after upload
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL
  const [uploading, setUploading] = useState(false); // Track upload progress
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = localStorage.getItem("userId");
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage)); // Preview the selected image
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setUploading(true);
    try {
      //   const uploadedImageId = await uploadImage(image, (progress) => {
      //     // Optionally handle the progress here (for example, show progress bar)
      //     console.log("Upload progress:", progress);
      //   });
      //   setImageId(uploadedImageId); // Set the imageId after successful upload
      setUploading(false);
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      setUploading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!imageId) {
      alert("Please upload an image first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const marketData = {
        title: data.title,
        description: data.description,
        category: "market", // Explicitly setting category to market
        price: data.price,
        location: data.location,
        contact: data.contact,
        imageId, // Pass the imageId from the upload
        condition: data.condition,
      };

      // // Create the market listing
      // const response = await listingService.createMarketListing(marketData);
      // console.log("Market listing created:", response);

      // // Redirect to the market listings page (or anywhere you prefer)
      // navigate("/market");
      console.log(marketData);
    } catch (error) {
      console.error("Error creating market listing:", error);
      alert("Failed to create market listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //   if (!user) {
  //     return (
  //       <div className="text-center">
  //         <p>You must be logged in to create a post.</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Market Listing
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-4"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Item Title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe the item"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold">
            Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            {...register("price", { required: "Price is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="Location"
            {...register("location", { required: "Location is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.location && (
            <p className="text-red-500 text-xs">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-semibold">
            Contact Info
          </label>
          <input
            id="contact"
            type="text"
            placeholder="Contact Number"
            {...register("contact", { required: "Contact info is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.contact && (
            <p className="text-red-500 text-xs">{errors.contact.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="condition" className="block text-sm font-semibold">
            Condition
          </label>
          <select
            id="condition"
            {...register("condition", {
              required: "Item condition is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
          {errors.condition && (
            <p className="text-red-500 text-xs">{errors.condition.message}</p>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="mt-4">
          <label htmlFor="image" className="block text-sm font-semibold">
            Upload Image
          </label>

          {/* File Input */}
          <input
            id="image"
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading}
            className="mt-2 w-full py-2 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Listing..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default MarketPostForm;
