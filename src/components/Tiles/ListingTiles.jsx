import React from "react";
import { Link } from "react-router-dom";
import { Home, Briefcase, Gift } from "lucide-react";
import ImageComingSoon from "../../assets/img/image.png";

function ListingTile({ data }) {
  const { image, price, location, title, type, $id } = data;

  const renderIcon = () => {
    switch (type) {
      case "job":
        return <Briefcase size={20} />;
      case "room":
        return <Home size={20} />;
      case "giveaway":
        return <Gift size={20} />;
      default:
        return <Home size={20} />;
    }
  };

  return (
    <Link
      to={`/post/${$id}`} // Example path like /room/123 or /job/456
      className="w-full max-w-xs rounded-lg overflow-hidden shadow-md bg-white block hover:shadow-lg transition"
    >
      <div className="relative">
        <img
          src={ImageComingSoon}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded font-bold text-sm">
          ${price && price.toLocaleString()}
        </div>
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-1 rounded">
          {renderIcon()}
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-500">{location}</p>
        <h3 className="text-md font-semibold mt-1">{title}</h3>
      </div>
    </Link>
  );
}

export default ListingTile;
