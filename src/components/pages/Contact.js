import React from "react";
import Nav from "../Nav.js";
import ContactSection from "../ContactSection.js";

const Contact = () => {
  return (
    <>
      <Nav />
      <ContactSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Contact Us"
        subtitle=""
        buttonText="Send message"
        buttonColor="primary"
        showNameField={true}
      />
    </>
  );
};

export default Contact;
