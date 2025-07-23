import React, { useState } from "react";
import { Phone, MapPin, CalendarClock, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MarketImg from "../../../assets/img/market-item.png";

function MarketDetailPage() {
  const { id } = useParams(); // This will retrieve the 'id' from the URL
  console.log(id);
  const item = {
    title: "Brand New iPhone 14 Pro Max",
    seller: "John Doe",
    location: "Manhattan, NY",
    price: "$1,200",
    condition: "Brand New",
    description:
      "Selling a brand new iPhone 14 Pro Max, 256GB, unlocked. The phone is still in its original packaging, never opened. A perfect gift or upgrade.",
    postedAt: "2025-07-21",
    contactPhone: "(123) 456-7890",
    contactEmail: "johndoe@gmail.com",
    address: "1234 5th Ave, Manhattan, NY",
    mapLink: "https://www.google.com/maps?q=1234+5th+Ave,Manhattan,NY",
    shippingAvailable: true,
    returnPolicy: true,
    images: [MarketImg],
  };

  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Item Information) */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold">{item.title}</h1>
          <h2 className="text-xl text-gray-600">Seller: {item.seller}</h2>
          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
            <MapPin size={16} />
            <span>{item.location}</span>
            <CalendarClock size={16} />
            <span>{item.postedAt}</span>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Item Description</h3>
            <p className="mt-2">{item.description}</p>
          </div>

          {/* Image Gallery */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Item Images</h3>
            <div className="flex space-x-4 mt-2">
              {/* Thumbnail Images */}
              {item.images.map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 cursor-pointer"
                  onClick={() => handleImageChange(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              ))}
            </div>
            {/* Main Image */}
            <div className="mt-4">
              <img
                src={item.images[currentImage]}
                alt={`Main Image ${currentImage}`}
                className="w-full h-96 object-cover rounded-md"
              />
            </div>
          </div>

          {/* Item Condition */}
          <div className="mt-6 flex items-center space-x-2">
            <CheckCircle size={20} className="text-green-500" />
            <span className="text-lg">{item.condition}</span>
          </div>

          {/* Shipping Availability */}
          {item.shippingAvailable && (
            <div className="mt-4 flex items-center space-x-2">
              <CheckCircle size={20} className="text-blue-500" />
              <span className="text-lg">Shipping Available</span>
            </div>
          )}

          {/* Return Policy */}
          {item.returnPolicy && (
            <div className="mt-4 flex items-center space-x-2">
              <CheckCircle size={20} className="text-blue-500" />
              <span className="text-lg">Return Policy Available</span>
            </div>
          )}

          {/* Add map link */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Location</h3>
            <div className="mt-2">
              <a
                href={item.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar with Contact Info & Price) */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Price</h3>
            <p className="text-lg font-bold">{item.price}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Contact Info</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Phone size={16} />
              <span>{item.contactPhone}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <a href={`mailto:${item.contactEmail}`} className="text-blue-500">
                {item.contactEmail}
              </a>
            </div>
          </div>

          <Link
            to="/message"
            className="w-full py-2 text-center text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Message Seller
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MarketDetailPage;
