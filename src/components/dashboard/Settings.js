import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { updateAccount } from "../../actions/index";

const lightColor = "rgba(255, 255, 255, 0.7)";

const useStyles = makeStyles((theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  paper: {
    padding: 0,
  },
  fieldset: {
    border: 0,
  },
  input: {
    margin: "1.5rem",
  },
  divider: {
    //
  },
}));

const stateAbbreviations = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const Settings = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAccount, setUpdatedAccount] = useState({
    id: props.user_id,
    first_name: "",
    last_name: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const dispatch = useDispatch();

  const classes = useStyles();
  console.log("props", props);
  console.log("classes", classes);

  const handleChange = (event) => {
    setUpdatedAccount({
      ...updatedAccount,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateAccount(props.user_id, updatedAccount));
  };

  console.log(updatedAccount);

  return (
    <Paper className={classes.paper}>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      ></AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="fixed"
        elevation={0}
      ></AppBar>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isEditing} className={classes.fieldset}>
          <Grid container={true} direction="column">
            <Grid container={true}>
              <Grid item={true} xs={12} sm={12} md={12} justify="space-around">
                <Typography variant="h5" gutterBottom="true">
                  Personal Information
                </Typography>
                <Divider />
                <TextField
                  name="first_name"
                  label="First Name"
                  value={updatedAccount.first_name}
                  onChange={handleChange}
                  className={classes.input}
                />
                <TextField
                  name="last_name"
                  label="Last Name"
                  value={updatedAccount.last_name}
                  onChange={handleChange}
                  className={classes.input}
                />
              </Grid>
            </Grid>

            <Grid item={true} sm>
              <TextField
                name="address"
                label="Address"
                value={updatedAccount.address}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="address2"
                label="Apt/Unit/PO Box"
                value={updatedAccount.address2}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="city"
                label="City"
                value={updatedAccount.city}
                onChange={handleChange}
                className={classes.input}
              />
              <TextField
                name="state"
                label="State"
                value={updatedAccount.state}
                onChange={handleChange}
                className={classes.input}
                select
              >
                {stateAbbreviations.map((state) => {
                  return <MenuItem>{state}</MenuItem>;
                })}
              </TextField>
              <TextField
                name="zip"
                label="Zip Code"
                value={updatedAccount.zip}
                onChange={handleChange}
                className={classes.input}
              />
            </Grid>
          </Grid>
          <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
          <Button type="submit">Update Account</Button>
        </fieldset>
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.User.userId,
    first_name: state.User.first_name,
    last_name: state.User.last_name,
    address: state.User.address,
    address2: state.User.address2,
    city: state.User.city,
    state: state.User.state,
    zip: state.User.zip,
  };
};

export default connect(mapStateToProps, { updateAccount })(Settings);
