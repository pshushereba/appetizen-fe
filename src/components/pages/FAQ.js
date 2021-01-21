import React from "react";
import FaqSection from "../../components/FaqSection.js";
import Nav from "../Nav.js";
import { CssBaseline } from "@material-ui/core";

const FAQ = (props) => {
  return (
    <>
      <Nav />
      <FaqSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Frequently Asked Questions"
        subtitle=""
      />
    </>
  );
};

export default FAQ;
