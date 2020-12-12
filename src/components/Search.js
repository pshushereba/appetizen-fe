import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.common.white,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
}));

const Search = () => {
  const classes = useStyles();
  const [user, setUser] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  console.log(user);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SearchIcon className={classes.block} color="inherit" />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            placeholder="Search for users"
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              className: classes.searchInput,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
