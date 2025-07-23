import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import listingService from "../../../appwrite/config"; // Adjust the path as needed
import authService from "../../../appwrite/auth"; // Adjust path for auth service

const RoomPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStudio, setIsStudio] = useState(false); // Track studio selection
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      alert("You need to be logged in to create a post.");
      return;
    }

    setIsSubmitting(true);

    try {
      const roomData = {
        title: data.title,
        description: data.description,
        category: "room", // Explicitly setting category
        price: data.price,
        location: data.location,
        contact: data.contact,
        imageId: null, // You can add image upload functionality later
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        furnishing: data.furnishing,
        availableFrom: data.availableFrom,
        isStudio: data.isStudio, // New field for Studio
        utilitiesIncluded: data.utilitiesIncluded, // New field for Utilities Included
      };

      // Create the room listing
      const response = await listingService.createRoomListing(roomData);
      console.log("Room listing created:", response);

      // Redirect to the room listings page (or anywhere you prefer)
      navigate("/rooms");
    } catch (error) {
      console.error("Error creating room listing:", error);
      alert("Failed to create room listing.");
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

  const handleStudioChange = (e) => {
    const value = e.target.value === "true"; // Convert the string value to a boolean
    setIsStudio(value);

    // Reset the values of bedrooms and bathrooms if studio is selected
    if (value) {
      setValue("bedrooms", 1); // Set default value for studio
      setValue("bathrooms", 1); // Set default value for studio
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Room Listing
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
            placeholder="Room Title"
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
            placeholder="Describe the room"
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
            Price (per month)
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
            placeholder="Room Location"
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-semibold">
              Bedrooms
            </label>
            <input
              id="bedrooms"
              type="number"
              placeholder="Number of Bedrooms"
              {...register("bedrooms", {
                required: "Number of bedrooms is required",
                disabled: isStudio,
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.bedrooms && (
              <p className="text-red-500 text-xs">{errors.bedrooms.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-sm font-semibold">
              Bathrooms
            </label>
            <input
              id="bathrooms"
              type="number"
              placeholder="Number of Bathrooms"
              {...register("bathrooms", {
                required: "Number of bathrooms is required",
                disabled: isStudio,
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.bathrooms && (
              <p className="text-red-500 text-xs">{errors.bathrooms.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="furnishing" className="block text-sm font-semibold">
            Furnishing
          </label>
          <select
            id="furnishing"
            {...register("furnishing", {
              required: "Furnishing type is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
          {errors.furnishing && (
            <p className="text-red-500 text-xs">{errors.furnishing.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="availableFrom"
            className="block text-sm font-semibold"
          >
            Available From
          </label>
          <input
            id="availableFrom"
            type="date"
            {...register("availableFrom", {
              required: "Availability date is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.availableFrom && (
            <p className="text-red-500 text-xs">
              {errors.availableFrom.message}
            </p>
          )}
        </div>

        {/* Studio Selection */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">Studio?</label>
          <select
            {...register("isStudio", {
              required: "Studio selection is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleStudioChange}
          >
            <option value="false">Not a Studio</option>
            <option value="true">Studio</option>
          </select>
          {errors.isStudio && (
            <p className="text-red-500 text-xs">{errors.isStudio.message}</p>
          )}
        </div>

        {/* Utilities Included */}
        <div className="mt-4 flex items-center space-x-2">
          <input
            id="utilitiesIncluded"
            type="checkbox"
            {...register("utilitiesIncluded")}
            className="h-4 w-4"
          />
          <label htmlFor="utilitiesIncluded" className="text-sm font-semibold">
            Utilities Included
          </label>
          {/* No Agent Fee */}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <strong>Disclaimer:</strong> We only promote properties with no agent
          fees.
        </p>
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

export default RoomPostForm;
