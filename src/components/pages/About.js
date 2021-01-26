import React from "react";
import Nav from "../Nav.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import AboutHeroSection from "../AboutHeroSection.js";
import AboutBioSection from "../AboutBioSection.js";

const About = () => {
  return (
    <>
      <Nav />
      <CssBaseline />
      <AboutHeroSection
        bgColor="primary"
        size="large"
        bgImage=""
        bgImageOpacity={0.2}
        title="We help you make money"
        subtitle="Appetizen is a place for you to interact with your followers. Grow your audience, leverage your network, and make the most out of your cooking and baking skills."
      />
      <AboutBioSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Meet the Team"
        subtitle=""
      />
    </>
  );
};

export default About;
