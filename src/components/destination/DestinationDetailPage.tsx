"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReactLeafletMap from "@/src/components/MapComponent";
import { IDestination } from "@/src/types/destination.types";
import { TripForm } from "../trip/trip-form";
import { TripFormValues } from "@/src/schema/trip.schema";
import { createTrip } from "@/src/services/trips/trips";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUser } from "@/src/services/auth/getme";

export default function DestinationDetailPage({ destination }: { destination: IDestination }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dialog, setDialog] = useState(false);
  const router = useRouter();
  const [me, setMe] = useState()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination?.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination?.image.length) % destination?.image.length);
  };

  const handleTripSubmit = async (data: TripFormValues, resetForm: () => void) => {
    const tripPayload = {
      ...data,
      startDate: format(new Date(data.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(data.endDate), "yyyy-MM-dd"),
      destination: destination._id,
    };

    try {
      const res = await createTrip(tripPayload);
      
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        resetForm();
        setDialog(false);
        if (res?.data) {
          router.push(`/trip/${res.data._id}`);
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

    useEffect(()=>{
    const getMe = async () =>{
      const data = await getUser()
      setMe(data)
    }
      getMe()

  },[])


  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <button onClick={()=> router.back()} className="mb-6 flex items-center cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          {/* Main Content */}
          <div className="bg-white rounded-2xl overflow-hidden">
            {/* Image Gallery */}
            <div className="relative h-96 md:h-[500px]">
              <Image src={destination?.image[currentImageIndex]} alt={`${destination?.name} - Image ${currentImageIndex + 1}`} fill className="object-cover" priority />

              {/* Image Navigation */}
              <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {destination?.image.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-8" : "bg-white/50"}`}
                  />
                ))}
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-full font-semibold ${destination?.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {destination?.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 p-1 md:p-4 bg-gray-50 overflow-x-auto">
              {destination?.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex ? "border-blue-500" : "border-transparent"}`}
                >
                  <Image src={img} alt={`Thumbnail ${index + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>

            {/* Content Section */}
            <div className=" p-2 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{destination?.name}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">{destination?.location}</span>
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600">(4.5 • 128 reviews)</span>
                    </div>
                  </div>

                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">{destination?.description}</p>
                  </div>

                  {/* Activities Section */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Activities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination?.activities.map((activity, index) => (
                        <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Booking & Info */}
                <div className="space-y-6">
                  {/* Price Card */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-blue-600">৳{destination?.price}</span>
                      <span className="text-gray-600 ml-2">per person</span>
                    </div>
                    <button
                    disabled={me === undefined ? true : false}
                      onClick={() => setDialog(true)}
                      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors  disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Create A Tour
                    </button>
                    {
                      me === undefined && <span className="text-sm text-red-400">Please login to create a tour</span>
                    }
                    <button className="mt-4 w-full border-2 cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition-colors">
                      Add to Wishlist
                    </button>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">Best Time to Visit</p>
                          <p className="font-semibold">{destination?.bestTimeToVisit}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold">2-3 days recommended</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">Group Size</p>
                          <p className="font-semibold">2-10 people</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {destination?.interests.map((interest, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Map</h2>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-600">Coordinates</p>
                      <p className="font-mono text-gray-800">
                        {destination?.coordinates?.lat.toFixed(4)}, {destination?.coordinates?.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <div className="h-96 rounded-lg overflow-hidden">
                    <ReactLeafletMap lat={destination?.coordinates?.lat || 0} lng={destination?.coordinates?.lng || 0} name={destination?.name} height="100%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TripForm destination={destination} visible={dialog} onClose={() => setDialog(false)} onSubmit={handleTripSubmit} />
    </>
  );
}
