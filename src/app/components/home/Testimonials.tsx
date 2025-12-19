"use client";

import { FaStar } from "react-icons/fa";
import Image from "next/image";

import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("swiper/react").then(mod => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then(mod => mod.SwiperSlide), { ssr: false });

import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeaderSection from "../shared/HeaderSection";

export default function Testimonials() {
  // ⭐ Demo Review Data (based on IReview structure)
  const reviews = [
    {
      _id: "1",
      user: {
        name: "Arif Khan",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      rating: 5,
      comment: "Amazing experience! TravelBuddy made our trip effortless and fun.",
    },
    {
      _id: "2",
      user: {
        name: "Sara Ahmed",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      rating: 4,
      comment:
        "Great service and verified destinations. Booking was smooth and secure.",
    },
    {
      _id: "3",
      user: {
        name: "Tanvir Hossain",
        image: "https://randomuser.me/api/portraits/men/76.jpg",
      },
      rating: 5,
      comment:
        "Loved the expert travel guides! Made the whole trip memorable.",
    },
    {
      _id: "4",
      user: {
        name: "Maria Garcia",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      rating: 5,
      comment: "Best travel companion app I've ever used! Highly recommended.",
    },
    {
      _id: "5",
      user: {
        name: "John Smith",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      rating: 4,
      comment: "The auto-scroll feature makes browsing testimonials so smooth!",
    },
    {
      _id: "6",
      user: {
        name: "Lisa Wang",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
      },
      rating: 5,
      comment: "Customer service is outstanding. They really care about travelers.",
    },
  ];

  const swiperConfig = {
    modules: [Autoplay, Pagination],
    spaceBetween: 30,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    loop: true,
    grabCursor: true,
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 3,
      },
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <HeaderSection title="What Our Travelers Say" description="Real reviews from real travelers who trusted TravelBuddy with their journeys." />

        {/* Swiper Container */}
        <div className="relative">
          <Swiper {...swiperConfig} className="pb-12 h-52">
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mx-2 h-44">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-14 h-14">
                      <Image
                        src={review.user.image}
                        alt={review.user.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <span className="text-lg font-semibold">{review.user.name}</span>
                      
                      {/* Rating */}
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                            size={16}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          ({review.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
