import React from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import HeroCardSection from "../components/HeroCardSection";
const LandingPage = () => {
  return (
    <>
      <Hero />
      <HeroCardSection />
      <div id="about">
        <AboutUs />
      </div>
      <div id="contact">
        <ContactUs />
      </div>
    </>
  );
};

export default LandingPage;
