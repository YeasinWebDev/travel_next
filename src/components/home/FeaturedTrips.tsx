"use client";

import React from "react";
import Image from "next/image";
import HeaderSection from "../shared/HeaderSection";

export interface IPrecipitants {
  user: string;
  paymentId: string;
  numberOfGuests: number;
  joinedAt: Date;
}

export interface ITrip {
  _id?: string;
  title: string;
  creator: string;
  destination: string;
  startDate: string;
  endDate: string;
  capacity: number;
  participants?: IPrecipitants[];
  isFull?: boolean;
  status?: "active" | "completed" | "cancelled";
}

export interface IDestination {
  _id?: string;
  name: string;
  location: string;
  description: string;
  image: string[];
  interests: string[];
  division: string;
  price: number;
  bestTimeToVisit: string;
  activities: string[];
  isFeatured: boolean;
  status: "active" | "inactive";
  reviews: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ---------------- DEMO DATA ----------------

const demoDestinations: IDestination[] = [
  {
    _id: "d1",
    name: "Cox's Bazar Beach",
    location: "Cox's Bazar, Bangladesh",
    description: "World's longest natural sea beach.",
    image: ["/images/coxsbazar.jpg"],
    interests: ["beach", "relax"],
    division: "division1",
    price: 30,
    bestTimeToVisit: "Nov - Mar",
    activities: ["Beaches", "Food experiences"],
    isFeatured: true,
    status: "active",
    reviews: [],
  },
  {
    _id: "d2",
    name: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    description: "Hills and clouds valley view.",
    image: ["/images/sajek.jpg"],
    interests: ["mountain", "adventure"],
    division: "division2",
    price: 45,
    bestTimeToVisit: "Oct - Feb",
    activities: ["Mountains", "Adventure trips"],
    isFeatured: true,
    status: "active",
    reviews: [],
  },
];

const demoTrips: ITrip[] = [
  {
    _id: "t1",
    title: "Beach Escape Weekend",
    creator: "user1",
    destination: "d1",
    startDate: "2025-02-10",
    endDate: "2025-02-12",
    capacity: 10,
    participants: [
      { user: "u1", paymentId: "p1", numberOfGuests: 2, joinedAt: new Date() },
      { user: "u2", paymentId: "p2", numberOfGuests: 1, joinedAt: new Date() },
    ],
    isFull: false,
    status: "active",
  },
  {
    _id: "t2",
    title: "Sajek Hills Adventure Trip",
    creator: "user2",
    destination: "d2",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    capacity: 6,
    participants: [
      { user: "u3", paymentId: "p3", numberOfGuests: 2, joinedAt: new Date() },
      { user: "u4", paymentId: "p4", numberOfGuests: 2, joinedAt: new Date() },
    ],
    isFull: false,
    status: "active",
  },
  {
    _id: "t3",
    title: "Sajek Hills Adventure Trip",
    creator: "user2",
    destination: "d2",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    capacity: 6,
    participants: [
      { user: "u3", paymentId: "p3", numberOfGuests: 2, joinedAt: new Date() },
      { user: "u4", paymentId: "p4", numberOfGuests: 2, joinedAt: new Date() },
    ],
    isFull: false,
    status: "active",
  },
  {
    _id: "t4",
    title: "Sajek Hills Adventure Trip",
    creator: "user2",
    destination: "d2",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    capacity: 6,
    participants: [
      { user: "u3", paymentId: "p3", numberOfGuests: 2, joinedAt: new Date() },
      { user: "u4", paymentId: "p4", numberOfGuests: 2, joinedAt: new Date() },
    ],
    isFull: false,
    status: "active",
  },
];

// Helper to merge trip + destination
const joinTripsWithDest = () => {
  return demoTrips.map((trip) => {
    const dest = demoDestinations.find((d) => d._id === trip.destination);
    return { ...trip, destinationData: dest };
  });
};

export default function FeaturedTrips() {
  const trips = joinTripsWithDest();

  return (
    <section className=" px-6 md:px-20 py-16">
      <HeaderSection title="Featured Trips" description="Browse featured trips designed to create lasting memories and breathtaking moments of adventure." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trips.map((trip) => (
          <article key={trip._id} className="bg-white shadow-sm rounded-xl overflow-hidden border hover:shadow-md transition">
            {/* Image */}
            <div className="relative h-48 w-full">
              <img src={trip.destinationData?.image?.[0] || "/images/placeholder.jpg"} alt={trip.title} className="object-cover w-full h-full" />
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{trip.title}</h3>
              <p className="text-sm text-gray-600">{trip.destinationData?.location}</p>

              <div className="text-sm text-gray-500 flex justify-between mt-2">
                <span>
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">
                  {trip.participants?.reduce((sum, p) => sum + p.numberOfGuests, 0) || 0}/{trip.capacity} joined
                </span>
                <button className="px-4 py-2 text-sm bg-primary text-white rounded-sm transition cursor-pointer hover:scale-105 duration-300">View Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
