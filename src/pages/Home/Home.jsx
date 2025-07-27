import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Home, ShoppingCart, Calendar } from "lucide-react"; // Icons for each section
import { DataContext } from "../../context/DataContext"; // Adjust path to your DataContext
import Hero from "../../assets/img/hero.png";

function HomePage() {
  const { posts, loading, error, fetchPosts } = useContext(DataContext);

  console.log(posts); // For debugging

  const categories = [
    {
      name: "Rooms",
      description: "Find a room to rent or sublet.",
      icon: <Home size={24} />,
      link: "/rooms",
    },
    {
      name: "Jobs",
      description: "Explore job opportunities in New York.",
      icon: <Briefcase size={24} />,
      link: "/jobs",
    },
    {
      name: "Market",
      description: "Buy and sell items in your area.",
      icon: <ShoppingCart size={24} />,
      link: "/market",
    },
    {
      name: "Events",
      description: "Stay updated with local events.",
      icon: <Calendar size={24} />,
      link: "/events",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Section */}
      <div className=" text-white text-center py-6">
        <img src={Hero} />
      </div>

      {/* Tiles Section */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <Link to={category.link} className="block p-6 text-center">
                <div className="mb-4 text-blue-500">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-gray-500">{category.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        {loading && <p className="text-center">Loading posts...</p>}
        {error && (
          <p className="text-center text-red-500">
            Error: {error}{" "}
            <button
              onClick={fetchPosts}
              className="ml-2 text-blue-500 underline"
            >
              Retry
            </button>
          </p>
        )}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all p-6"
            >
              {post.imageUrls && post.imageUrls.length > 0 ? (
                <img
                  src={post.imageUrls[0]} // Display the first image
                  alt={post.title || "Post image"}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
              <h3 className="text-lg font-semibold">
                {post.title || "Untitled Post"}
              </h3>
              <p className="mt-2 text-gray-500">
                {post.description || "No description available."}
              </p>
              <Link
                to={`/posts/${post.$id}`}
                className="mt-4 inline-block text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2025 Hamro NYC. All Rights Reserved.</p>
          <div className="mt-4">
            <Link to="/about" className="text-gray-400 hover:text-white mx-2">
              About
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white mx-2">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
