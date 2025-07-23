import React, { useState, useCallback } from "react";
import { useParams } from "react-router";

import {
  Phone,
  MapPin,
  BedDouble,
  Bath,
  CalendarClock,
  DoorOpen,
} from "lucide-react";
import ImgApt from "../../../assets/img/apt-kitchen.png";
import userPic from "../../../assets/img/user-pic.png";

export default function ListingDetailPage({ listing }) {
  // ────────────────────────────────────────────────────────────────────────────
  // fallback mock data for design‑time preview
  const { id } = useParams(); // This will retrieve the 'id' from the URL
  console.log(id);
  if (!listing) {
    listing = {
      id: 1,
      title: "Wystone 147‑ga/19 Avenue · 1st floor · 2 Bed · 1 Bath",
      price: 2400,
      location: "Queens, NY",
      date: "2025‑07‑21",
      views: 48,
      type: "room", // job | item | giveaway etc.
      images: [ImgApt, ImgApt, ImgApt, ImgApt, ImgApt, ImgApt],
      specs: {
        bedrooms: 2,
        bathrooms: 1,
        area: 700, // ft²
        moveIn: "Immediate",
        period: "More than a year",
        utilities: 0,
        deposit: 2400,
        canCook: true,
      },
      description: [
        "Flushing 147‑ga / 19 Avenue 1st floor, quiet and safe neighborhood.",
        "Convenient transportation with easy access to the highway.",
        "Close to public transportation and marts.",
        "Please contact me for more information. 212‑844‑9794",
      ],
      contact: {
        name: "Kimberly Park",
        phone: 6463215678,
        avatar: { userPic },
      },
    };
  }

  // ────────────────────────────────────────────────────────────────────────────
  const [active, setActive] = useState(0);
  const changeSlide = useCallback((i) => setActive(i), []);

  // helper formatter
  const usd = (n) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <section
      className="max-w-7xl mx-auto p-4 md:p-8"
      data-testid="listing-detail"
    >
      {/* Headline */}
      <header className="mb-4 flex flex-col gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {listing.title}
        </h1>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <MapPin size={14} /> {listing.location}
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Views {listing.views}</span>
          <span className="hidden sm:inline">· Date {listing.date}</span>
        </div>
      </header>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        {/* ── GALLERY ─────────────────────────────────────────────────────── */}
        <div>
          <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={listing.images[active]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
              {active + 1}/{listing.images.length}
            </span>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {listing.images.map((src, i) => (
              <button
                key={i}
                onClick={() => changeSlide(i)}
                className={`h-16 aspect-video rounded-lg overflow-hidden transition ring-offset-2 ${
                  i === active
                    ? "ring-2 ring-custom-primary"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside className="bg-white rounded-lg shadow p-4 space-y-4 h-fit">
          <div>
            <p className="text-2xl font-extrabold text-custom-primary">
              {usd(listing.price)}
              <span className="ml-1 text-base font-normal text-gray-600">
                FOR RENT
              </span>
            </p>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 text-sm font-semibold transition">
            <Phone size={16} /> Call
          </button>

          <ul className="text-sm text-gray-700 divide-y divide-gray-100">
            <li className="flex justify-between py-1">
              <span className="flex items-center gap-1">
                <BedDouble size={14} />
                Bedrooms
              </span>
              <span>{listing.specs.bedrooms} Beds</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="flex items-center gap-1">
                <Bath size={14} />
                Bathrooms
              </span>
              <span>{listing.specs.bathrooms} Bath</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="flex items-center gap-1">Area</span>
              <span>{listing.specs.area} ft²</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="flex items-center gap-1">
                <CalendarClock size={14} />
                Move‑in
              </span>
              <span>{listing.specs.moveIn}</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Deposit</span>
              <span>{usd(listing.specs.deposit)}</span>
            </li>
            {listing.specs.canCook && (
              <li className="flex justify-between py-1">
                <span className="flex items-center gap-1">
                  <DoorOpen size={14} />
                  Kitchen
                </span>
                <span>Allowed</span>
              </li>
            )}
          </ul>
        </aside>
      </div>

      {/* ── DESCRIPTION ────────────────────────────────────────────────────── */}
      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">Detailed description</h2>
        {listing.description.map((line, i) => (
          <p key={i} className="text-gray-800 leading-relaxed">
            {line}
          </p>
        ))}
      </section>

      {/* ── contact INFO / FOOTER ───────────────────────────────────────────── */}
      <aside className="mt-10 grid md:grid-cols-[1fr_250px] gap-8">
        {/* Placeholder for comments / ads */}
        <div className="space-y-4" />

        {/* contact card */}
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-gray-700">Contact INFO</h3>
          <div className="flex items-center gap-3">
            <img
              src={listing.contact.avatar}
              alt={listing.contact.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">
                {listing.contact.name}
              </p>
              <p className="font-medium text-gray-800">
                {listing.contact.phone}
              </p>
            </div>
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-2 rounded-md font-semibold transition">
            Inquiry
          </button>
        </div>
      </aside>
    </section>
  );
}
