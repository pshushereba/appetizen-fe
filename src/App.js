import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/styles/Theme.js";
import Nav from "./components/Nav.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <h1>Testing</h1>
      <p>Testing HMR</p>
    </ThemeProvider>
  );
}

export default App;
