import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Home, ShoppingCart, Calendar } from "lucide-react"; // Icons for each section
import TilePage from "../../components/Tiles/TilePage";

function HomePage() {
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
      <div className="bg-orange-500 text-white text-center py-6">
        <h1 className="text-3xl font-bold">Hamro NYC</h1>
        <p className="mt-2 text-xl">
          A space for Nepali people in New York to find rooms, jobs, events, and
          more!
        </p>
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
      <TilePage />
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
