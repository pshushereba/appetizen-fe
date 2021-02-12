import { Icon } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#561A8D",
    },
    secondary: {
      main: "#00BBF9",
    },
  },
  header: {
    indicator: {
      background: red[700],
    },
  },
  spacing: 8,
});

export default theme;
