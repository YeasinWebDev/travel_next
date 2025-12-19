import { FaShieldAlt, FaClock, FaStar, FaComments, FaUserTie, FaCheckCircle } from "react-icons/fa";
import HeaderSection from "../shared/HeaderSection";

export default function WhyWayfare() {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Verified Destinations",
      description: "All destinations are verified by our expert travel team.",
    },
    {
      icon: <FaClock />,
      title: "Easy Trip Booking",
      description: "Book your trip in minutes with a simple and smooth process.",
    },
    {
      icon: <FaComments />,
      title: "Real Reviews",
      description: "Get genuine reviews from real travelers about every place.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure Payments",
      description: "Your transactions are protected with top-notch security.",
    },
    {
      icon: <FaUserTie />,
      title: "Expert Travel Guides",
      description: "Travel with experienced and trained professional guides.",
    },
    {
      icon: <FaStar />,
      title: "24/7 Support",
      description: "We provide full-time support whenever you need help.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <HeaderSection
          title="Why WayFare?"
          description="Discover why thousands of travelers trust WayFare for safe, easy, and enjoyable trips."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div key={index} className="bg-white shadow-lg p-8 rounded-xl hover:shadow-xl transition duration-300 flex flex-col items-start gap-4 min-h-[200px] cursor-pointer hover:scale-105">
              <span className="text-4xl text-blue-600">{item.icon}</span>

              <h1 className="text-xl font-semibold">{item.title}</h1>

              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
