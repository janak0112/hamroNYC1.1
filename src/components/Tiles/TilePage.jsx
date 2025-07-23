import React from "react";
import ListingTile from "./ListingTiles";

const listings = [
  {
    image: "/images/desk.jpg",
    price: 3708,
    location: "Fort Lee, NJ",
    title: "2011 HONDA CIVIC LX 판매합니다!",
    type: "item",
  },
  {
    image: "/images/car.jpg",
    price: 4438,
    location: "Flushing, NY",
    title: "산수이 앰프",
    type: "job",
  },
  {
    image: "/images/room.jpg",
    price: 4767,
    location: "Edgewater, NJ",
    title: "써블렛 맨해튼 원베드룸",
    type: "item",
  },
  {
    image: "/images/pet.jpg",
    price: 0,
    location: "Fort Lee, NJ",
    title: "프라이빗 룸 / 즉시 입주",
    type: "item",
  },
  {
    image: "/images/pet.jpg",
    price: 2149,
    location: "Edgewater, NJ",
    title: "Free Desk and Chair - Pickup Only",
    type: "room",
  },
  {
    image: "/images/ipad.jpg",
    price: 3961,
    location: "Jersey City, NJ",
    title: "Looking for Server - Korean BBQ",
    type: "room",
  },
  {
    image: "/images/fridge.jpg",
    price: 4698,
    location: "New York, NY",
    title: "Used MacBook Pro 2020 for Sale",
    type: "item",
  },
  {
    image: "/images/fridge.jpg",
    price: 0,
    location: "Fort Lee, NJ",
    title: "나눔 - 책상과 의자",
    type: "giveaway",
  },
  {
    image: "/images/pet.jpg",
    price: 0,
    location: "New York, NY",
    title: "Modern 2BR in Jersey City",
    type: "giveaway",
  },
  {
    image: "/images/ipad.jpg",
    price: 4128,
    location: "Flushing, NY",
    title: "Hiring: Front Desk Staff",
    type: "job",
  },
  {
    image: "/images/sofa.jpg",
    price: 0,
    location: "New York, NY",
    title: "iPad 10th Gen - Like New",
    type: "giveaway",
  },
  {
    image: "/images/room.jpg",
    price: 2368,
    location: "Edgewater, NJ",
    title: "Temporary Sublet in Flushing",
    type: "room",
  },
  {
    image: "/images/building.jpg",
    price: 2389,
    location: "Flushing, NY",
    title: "Private Tutoring Job Available",
    type: "job",
  },
  {
    image: "/images/ipad.jpg",
    price: 0,
    location: "New York, NY",
    title: "Pet Supplies Giveaway",
    type: "giveaway",
  },
  {
    image: "/images/laptop.jpg",
    price: 0,
    location: "Edgewater, NJ",
    title: "중고 냉장고 판매",
    type: "giveaway",
  },
  {
    image: "/images/building.jpg",
    price: 3963,
    location: "Jersey City, NJ",
    title: "Room Available near Journal Sq",
    type: "room",
  },
  {
    image: "/images/car.jpg",
    price: 0,
    location: "Fort Lee, NJ",
    title: "Old Camera Equipment - Free",
    type: "giveaway",
  },
  {
    image: "/images/room.jpg",
    price: 2211,
    location: "Jersey City, NJ",
    title: "Part-Time Dishwasher Needed",
    type: "job",
  },
  {
    image: "/images/desk.jpg",
    price: 0,
    location: "Flushing, NY",
    title: "Study Table Giveaway",
    type: "giveaway",
  },
  {
    image: "/images/laptop.jpg",
    price: 1504,
    location: "Palisades Park, NJ",
    title: "Brand New Sofa for Sale",
    type: "item",
  },
];

function TilePage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {listings.map((item, index) => (
        <ListingTile key={index} data={item} />
      ))}
    </div>
  );
}

export default TilePage;
