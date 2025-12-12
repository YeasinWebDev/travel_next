import Image from "next/image";
import Banner from "../../../../public/images/travel_hero.jpg";
import { Button } from "../ui/button";
import HeaderSection from "../shared/HeaderSection";
import Navbar from "../shared/CommonNavbar";

function Hero() {
  return (
    <div className="relative w-full h-[600px] md:h-[700px]">
      {/* Background Image */}
      <Image src={Banner} alt="Banner" fill priority className="object-cover h-full pointer-events-none" quality={100} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center  text-white px-4 text-center z-50">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="flex items-center flex-col mt-20 h-full">
          <HeaderSection
            title="Discover. Explore. GO!"
            description="Where every journey begins with a dream — and ends with an unforgettable story. Plan smarter, travel better, and unlock breathtaking destinations worldwide."
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="text-sm sm:text-base px-8 py-4 sm:px-10 sm:py-6 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary/80 transition">
              Start Your Journey
            </Button>

            <Button className="text-sm sm:text-base px-8 py-4 sm:px-10 sm:py-6 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full shadow-lg hover:bg-white/20 hover:shadow-xl transition-all">
              Browse Destinations
            </Button>
          </div>

          <p className="mt-10 text-xs sm:text-sm opacity-90 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            Trusted by travelers across the world 🌍 | Safe bookings · Real experiences
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
