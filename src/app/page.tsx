export const dynamic = "force-dynamic";

import Hero from "@/src/app/components/home/Hero";
import Destinations from "@/src/app/components/home/Destinations";
import FeaturedTrips from "@/src/app/components/home/FeaturedTrips";
import WhyWayfare from "@/src/app/components/home/WhyWayfare";
import Testimonials from "@/src/app/components/home/Testimonials";
import NewsletterSignup from "@/src/app/components/home/NewsletterSignup";
import Footer from "./components/shared/CommonFooter";

export default function Home() {
  return (
  <div>
    <Hero/>
    <Destinations/>
    <FeaturedTrips/>
    <WhyWayfare/>
    <Testimonials/>
    <NewsletterSignup/>
    <Footer/>
  </div>
  );
}
