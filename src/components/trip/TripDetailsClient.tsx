"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  CreditCard,
  Mail,
  Phone,
  ArrowLeft,
  ChevronRight,
  Star,
  MessageCircle,
  Share2,
  Bookmark,
  HandCoins,
} from "lucide-react";
import { useRouter } from "next/navigation";
// import ImageGallery from './components/ImageGallery';
// import TripItinerary from './components/TripItinerary';
// import ParticipantsList from './components/ParticipantsList';
// import JoinTripModal from './components/JoinTripModal';
// import ContactModal from './components/ContactModal';
import Link from "next/link";
import { ITrip, IUser } from "@/src/types/trips.types";
import Image from "next/image";
import ReactLeafletMap from "../MapComponent";
import ParticipantsList from "./ParticipantsList";
import TripItinerary from "./TripItinerary";
import JoinTripModal from "./JoinTripModal";

interface TripDetailsClientProps {
  trip: ITrip;
  currentUser: IUser | null;
  isUserParticipant: boolean;
}

type ActiveTab = "overview" | "itinerary" | "participants" | "location";

const TripDetailsClient: React.FC<TripDetailsClientProps> = ({ trip, currentUser, isUserParticipant }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Calculate remaining spots
  const participantsCount = trip.participants?.reduce((sum, p) => sum + p.numberOfGuests, 0) || 0;
  const remainingSpots = trip.capacity - participantsCount;
  const isTripFull = trip.isFull || remainingSpots <= 0;

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate trip duration
  const getTripDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleJoinTrip = async () => {
    if (!currentUser) {
      router.push("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }
    setIsJoinModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Back Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section with Image Gallery */}
        <div className="relative">
          <Image src={trip.image || trip.destination.image[1] || trip.destination.image[0]} alt={trip.title} width={0} height={0} sizes="100vw" className="w-full h-68 object-cover" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              {/* Trip Header */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {trip.title}{" "}
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm ${
                          trip.status === "active" ? "bg-green-100/90 text-green-800" : trip.status === "completed" ? "bg-gray-100/90 text-gray-800" : "bg-red-100/90 text-red-800"
                        }`}
                      >
                        {trip.status?.toUpperCase()}
                      </span>
                    </h1>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>
                        {trip.destination.location}
                      </span>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <img src={trip.creator.profileImage} alt={trip.creator.name} className="w-12 h-12 rounded-full" />
                    <div className="w-40">
                      <p className="text-sm text-gray-500">Organized by</p>
                      <p className="font-semibold">{trip.creator.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Shield className="w-4 h-4" />
                        {trip.creator.role === "admin" ? "Verified Organizer" : "Traveler"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-lg font-semibold">{getTripDuration()} days</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-500">Spots</p>
                    <p className="text-lg font-semibold">
                      {participantsCount}/{trip.capacity}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-lg font-semibold">{new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                      {/* <DollarSign className="w-5 h-5" /> */} 
                      <HandCoins className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-semibold">৳ {trip.destination.price}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
                <div className="border-b">
                  <nav className="flex overflow-x-auto">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "itinerary", label: "Itinerary" },
                      { id: "participants", label: `Participants (${participantsCount})` },
                      { id: "location", label: "Location" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ActiveTab)}
                        className={`flex-shrink-0 px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap ${
                          activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      {/* Dates Section */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Dates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">Start Date</p>
                            <p className="text-lg font-semibold">{formatDate(trip.startDate)}</p>
                          </div>
                          <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-500 mb-1">End Date</p>
                            <p className="text-lg font-semibold">{formatDate(trip.endDate)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Destination Description */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">About this trip</h3>
                        <div className="prose max-w-none text-gray-600">
                          <p>{trip.destination.description}</p>
                        </div>
                      </div>

                      {/* Activities */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Activities</h3>
                        <div className="flex flex-wrap gap-2">
                          {trip.destination.activities.map((activity, index) => (
                            <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Best Time to Visit */}
                      <div className="bg-blue-50 rounded-xl p-5">
                        <h4 className="font-semibold text-blue-800 mb-2">Best Time to Visit</h4>
                        <p className="text-blue-700">{trip.destination.bestTimeToVisit}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'itinerary' && (
                    <TripItinerary
                      duration={getTripDuration()}
                      startDate={trip.startDate}
                      endDate={trip.endDate}
                      destination={trip.destination}
                    />
                  )}

                  {activeTab === 'participants' && (
                    <ParticipantsList
                      participants={trip.participants || []}
                      creator={trip.creator}
                      currentUser={currentUser}
                    />
                  )}

                  {activeTab === "location" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Location Details</h3>
                        <div className="bg-gray-100 rounded-xl p-6">
                          <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-gray-500 mt-1" />
                            <div>
                              <h4 className="font-semibold text-lg">{trip.destination.name}</h4>
                              <p className="text-gray-600">{trip.destination.location}</p>
                              <p className="text-gray-500 mt-2">{trip.destination.division}</p>

                              {trip.destination.coordinates && (
                                <p className="text-sm text-gray-500 mt-2">
                                  Coordinates: {trip.destination.coordinates.lat.toFixed(6)},{trip.destination.coordinates.lng.toFixed(6)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Map Placeholder */}
                      <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Map</h2>
                        <div className="bg-gray-100 p-4 rounded-xl">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <p className="text-gray-600">Coordinates</p>
                              <p className="font-mono text-gray-800">
                                {trip.destination?.coordinates?.lat.toFixed(4)}, {trip.destination?.coordinates?.lng.toFixed(4)}
                              </p>
                            </div>
                          </div>
                          <div className="h-96 rounded-lg overflow-hidden">
                            <ReactLeafletMap lat={trip.destination?.coordinates?.lat || 0} lng={trip.destination?.coordinates?.lng || 0} name={trip.destination?.name} height="100%" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <button disabled={isTripFull} className="text-xl font-bold mb-6" onClick={()=> setIsJoinModalOpen(true)}>Join this trip</button>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold">৳ {trip.destination.price}</span>
                      <span className="text-gray-500">per person</span>
                    </div>
                    <p className="text-gray-600 text-sm">All fees and taxes included</p>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-700 font-medium">Available spots</span>
                      <span className={`font-semibold ${remainingSpots > 3 ? "text-green-600" : "text-orange-600"}`}>{remainingSpots} left</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${(participantsCount / trip.capacity) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      {participantsCount} of {trip.capacity} spots filled
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      trip.status === "active"
                        ? "bg-green-50 border border-green-100"
                        : trip.status === "completed"
                        ? "bg-gray-50 border border-gray-100"
                        : "bg-red-50 border border-red-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {trip.status === "active" ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-semibold">Trip is Active</p>
                            <p className="text-sm text-gray-600">Accepting participants</p>
                          </div>
                        </>
                      ) : trip.status === "completed" ? (
                        <>
                          <Clock className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-semibold">Trip Completed</p>
                            <p className="text-sm text-gray-600">No longer available</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="font-semibold">Trip Cancelled</p>
                            <p className="text-sm text-gray-600">Not available</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {trip.status === "active" && !isTripFull && (
                      <button
                        onClick={handleJoinTrip}
                        disabled={isUserParticipant}
                        className={`w-full py-3.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                          isUserParticipant ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {isUserParticipant ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Already Joined
                          </>
                        ) : (
                          "Join This Trip"
                        )}
                      </button>
                    )}

                    {isTripFull && trip.status === "active" && (
                      <div className="text-center py-3.5 bg-red-50 text-red-600 rounded-lg font-medium">
                        <Users className="w-5 h-5 inline-block mr-2" />
                        Trip is Full
                      </div>
                    )}

                    {/* <button
                      onClick={handleContactCreator}
                      className="w-full py-3.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contact Organizer
                    </button> */}

                    <Link
                      href={`/destinations/${trip.destination._id}`}
                      className="block w-full py-3.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                    >
                      View Destination Details
                    </Link>
                  </div>

                  {/* Security Badges */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center justify-center gap-6">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="w-5 h-5 text-gray-600" />
                        </div>
                        <p className="text-xs text-gray-600">Secure Booking</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                        </div>
                        <p className="text-xs text-gray-600">Flexible Payment</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Mail className="w-5 h-5 text-gray-600" />
                        </div>
                        <p className="text-xs text-gray-600">Instant Confirmation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h4 className="font-bold mb-4">Need to know</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Free cancellation 7 days before departure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">All activities included in price</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Accommodation and meals provided</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Travel insurance recommended</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <JoinTripModal 
      trip={trip}
      visible={isJoinModalOpen}
      onClose={() => setIsJoinModalOpen(false)}
      remainingSpots={remainingSpots}
      />
    </>
  );
};

export default TripDetailsClient;
