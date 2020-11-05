import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Nav = () => {
  return (
    <div>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar>
            <Typography>Appetizen</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
};

export default Nav;
