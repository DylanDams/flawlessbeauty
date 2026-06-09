import About from "@/components/About";
import Footer from "@/components/Footer";
import Giftcard from "@/components/Giftcard";
import HeroVideo from "@/components/HeroVideo";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import Prelude from "@/components/Prelude";
import PriceList from "@/components/PriceList";
import Products from "@/components/Products";
import SalonizedWidgets from "@/components/SalonizedWidgets";
import ScrollProgress from "@/components/ScrollProgress";
import StudioGallery from "@/components/StudioGallery";
import Treatments from "@/components/Treatments";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <IntroLoader />
      <Navbar />
      <HeroVideo />
      <Prelude />
      <Treatments />
      <PriceList />
      <About />
      <StudioGallery />
      <Products />
      <Giftcard />
      <SalonizedWidgets />
      <Footer />
    </>
  );
}
