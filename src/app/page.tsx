import Hero from "@/src/components/home/Hero";
import Destinations from "@/src/components/home/Destinations";
import FeaturedTrips from "@/src/components/home/FeaturedTrips";
import WhyWayfare from "@/src/components/home/WhyWayfare";
import Testimonials from "@/src/components/home/Testimonials";
import NewsletterSignup from "@/src/components/home/NewsletterSignup";
import Footer from "../components/shared/CommonFooter";

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
