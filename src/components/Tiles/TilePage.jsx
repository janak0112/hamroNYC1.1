import React, { useEffect } from "react";
import ListingTile from "./ListingTiles";
import listingService from "../../appwrite/config";

function TilePage() {
  let listings = [];
  useEffect(() => {
    const getRooms = async () => {
      listings = await listingService.getListings();
      console.log(listings);
    };
    getRooms();
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {listings.map((item, index) => (
        <ListingTile key={index} data={item} />
      ))}
    </div>
  );
}

export default TilePage;
