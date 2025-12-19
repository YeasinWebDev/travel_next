import Image from "next/image";
import Banner from "../../../../public/images/travel_hero.webp";
import { Button } from "../ui/button";
import HeaderSection from "../shared/HeaderSection";
import Navbar from "../shared/CommonNavbar";
import Link from "next/link";

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
            <Link
              href="/trips"
              className="
                    inline-flex items-center justify-center
                    text-sm
                    px-5 py-3
                    min-h-[44px] min-w-[44px]
                    bg-primary text-white font-semibold
                    rounded-full shadow-md
                    hover:bg-primary/90 hover:scale-[1.03]
                    transition-all duration-200
                  "
            >
              Start Your Journey
            </Link>

            <Link href="/destinations">
              <Button className="text-sm sm:text-base px-5 py-3 min-h-[44px] min-w-[44px] bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full shadow-lg hover:bg-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                Browse Destinations
              </Button>
            </Link>
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
