import Hero from "@/components/organisms/landing/hero";
import StoreFile from "@/components/organisms/landing/store-file";
import Service from "@/components/organisms/landing/service";
import Feature from "@/components/organisms/landing/features";
import Pricing from "@/components/organisms/landing/pricing";
import Testimonial from "@/components/organisms/landing/testimonial";

const Landing = () => {
  return (
    <>
      <Hero />
      <StoreFile />
      <Service />
      <Feature />
      <Pricing />
      <Testimonial />
    </>
  )
}

export default Landing;