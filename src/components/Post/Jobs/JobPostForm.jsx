import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import listingService from "../../../appwrite/config"; // Adjust the path as needed
import authService from "../../../appwrite/auth"; // Adjust path for auth service

const JobPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const jobData = {
        title: data.title,
        description: data.description,
        category: "job", // Explicitly setting category to job
        salary: data.salary,
        location: data.location,
        contact: data.contact,
        jobType: data.jobType,
        experienceRequired: data.experienceRequired,
        company: data.company,
        imageId: null, // You can add image upload functionality later
      };

      // Create the job listing
      const response = await listingService.createJobListing(jobData);
      console.log("Job listing created:", response);

      // Redirect to the job listings page (or anywhere you prefer)
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job listing:", error);
      alert("Failed to create job listing.");
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
        Create Job Listing
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-4"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-semibold">
            Job Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Job Title"
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
            placeholder="Describe the job role"
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
          <label htmlFor="salary" className="block text-sm font-semibold">
            Salary
          </label>
          <input
            id="salary"
            type="number"
            placeholder="Salary"
            {...register("salary", { required: "Salary is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.salary && (
            <p className="text-red-500 text-xs">{errors.salary.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="Job Location"
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
          <label htmlFor="jobType" className="block text-sm font-semibold">
            Job Type
          </label>
          <select
            id="jobType"
            {...register("jobType", { required: "Job type is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="temporary">Temporary</option>
          </select>
          {errors.jobType && (
            <p className="text-red-500 text-xs">{errors.jobType.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="experienceRequired"
            className="block text-sm font-semibold"
          >
            Experience Required (in years)
          </label>
          <input
            id="experienceRequired"
            type="number"
            placeholder="Experience Required"
            {...register("experienceRequired", {
              required: "Experience is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.experienceRequired && (
            <p className="text-red-500 text-xs">
              {errors.experienceRequired.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-semibold">
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="Company Name"
            {...register("company", { required: "Company name is required" })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.company && (
            <p className="text-red-500 text-xs">{errors.company.message}</p>
          )}
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <input
            id="checkOnly"
            type="checkbox"
            {...register("checkOnly")}
            className="h-4 w-4"
          />
          <label htmlFor="checkOnly" className="text-sm font-semibold">
            Check Only
          </label>
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

export default JobPostForm;
