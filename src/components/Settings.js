import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { updateAccount } from "../actions/index";

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
  divider: {
    //
  },
}));

const Settings = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAccount, setUpdatedAccount] = useState({
    id: props.account.id,
    first_name: "",
    last_name: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    case_number: "",
    case_type: "",
    party_name: "",
  });

  const classes = useStyles();
  console.log("props", props);
  console.log("classes", classes);

  useEffect(() => {
    setUpdatedAccount(props.account);
  }, []);

  // console.log(props.account);

  const handleChange = (event) => {
    setUpdatedAccount({
      ...updatedAccount,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAccount(props.account.id, updatedAccount);
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
      >
        {/* Need to fix the position of this. */}
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="Case Settings" />
          <Tab textColor="inherit" label="Account Settings" />
        </Tabs>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isEditing}>
          <Grid container direction="column">
            <Grid item sm>
              <Typography>Personal Information</Typography>
              <Divider />
              <TextField
                name="first_name"
                label="First Name"
                value={updatedAccount.first_name}
                onChange={handleChange}
              />
              <TextField
                name="last_name"
                label="Last Name"
                value={updatedAccount.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm>
              <TextField
                name="address"
                label="Address"
                value={updatedAccount.address}
                onChange={handleChange}
              />
              <TextField
                name="address2"
                label="Apt/Unit/PO Box"
                value={updatedAccount.address2}
                onChange={handleChange}
              />
              <TextField
                name="city"
                label="City"
                value={updatedAccount.city}
                onChange={handleChange}
              />
              <TextField
                name="state"
                label="State"
                value={updatedAccount.state}
                onChange={handleChange}
              />
              <TextField
                name="zip"
                label="Zip Code"
                value={updatedAccount.zip}
                onChange={handleChange}
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
    account: state.accountReducer.account,
  };
};

export default connect(mapStateToProps, { updateAccount })(Settings);
