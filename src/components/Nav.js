import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Nav = () => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography>Appetizen</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
