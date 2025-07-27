// components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all p-6">
    {post.imageUrls && post.imageUrls.length > 0 ? (
      <img
        src={post.imageUrls[0]}
        alt={post.title || "Post image"}
        className="w-full h-48 object-cover mb-4 rounded"
      />
    ) : (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded">
        <p className="text-gray-500">No image available</p>
      </div>
    )}
    <h3 className="text-lg font-semibold">{post.title || "Untitled Post"}</h3>
    <p className="mt-2 text-gray-500">
      {post.description || "No description available."}
    </p>
    <Link
      to={`/${post.type}/${post.$id}`}
      className="mt-4 inline-block text-blue-500 hover:underline"
    >
      View Details
    </Link>
  </div>
);

export default PostCard;
