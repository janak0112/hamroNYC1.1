import React, { useEffect, useState } from "react";
import ListingTile from "./ListingTiles";
import listingService from "../../appwrite/config";

function TilePage() {
  const [listings, setListings] = useState(null);
  useEffect(() => {
    const getRooms = async () => {
      const result = await listingService.getListings();
      setListings(result);
    };
    getRooms();
  }, []);

  if (!listings) {
    return <div className="p-4">Loading...</div>; // Optional loading indicator
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {listings.map((item, index) => (
        <ListingTile key={index} data={item} />
      ))}
    </div>
  );
}

export default TilePage;
