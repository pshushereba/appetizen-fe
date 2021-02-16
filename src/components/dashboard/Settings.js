import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { MenuItem, Card, CardContent, Select } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { updateAccount } from "../../actions/index";
import { spacing } from "@material-ui/system";

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
  inputWrapper: {
    marginBottom: "1.5rem",
  },
  divider: {
    marginBottom: "1.5rem",
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
  const theme = useTheme();
  const [updatedAccount, setUpdatedAccount] = useState({
    id: props.user_id,
    email: props.email,
    first_name: props.first_name,
    last_name: props.last_name,
    address: props.address,
    address2: props.address2,
    city: props.city,
    state: props.state,
    zip: props.zip,
  });

  const dispatch = useDispatch();
  const classes = useStyles();

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
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Divider className={classes.divider} />
        <form>
          <fieldset className={classes.fieldset}>
            <Grid container spacing={6}>
              <Grid item md={6}>
                <TextField
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  value={updatedAccount.first_name}
                  onChange={handleChange}
                  fullWidth
                  className={classes.inputWrapper}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={updatedAccount.last_name}
                  onChange={handleChange}
                  className={classes.inputWrapper}
                />
              </Grid>
            </Grid>

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              value={updatedAccount.email}
              onChange={handleChange}
              fullWidth
              className={classes.inputWrapper}
            />

            <TextField
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={updatedAccount.address}
              onChange={handleChange}
              fullWidth
              className={classes.inputWrapper}
            />

            <TextField
              name="address2"
              label="Apt/Unit/PO Box"
              variant="outlined"
              fullWidth
              value={updatedAccount.address2}
              onChange={handleChange}
              className={classes.inputWrapper}
            />

            <Grid container spacing={6}>
              <Grid item md={6}>
                <TextField
                  name="city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={updatedAccount.city}
                  onChange={handleChange}
                  className={classes.inputWrapper}
                />
              </Grid>
              <Grid item md={3}>
                <Select
                  name="state"
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={updatedAccount.state}
                  onChange={handleChange}
                  autoWidth={true}
                  className={classes.inputWrapper}
                >
                  {stateAbbreviations.map((state) => {
                    return <MenuItem value={state}>{state}</MenuItem>;
                  })}
                </Select>
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="zip"
                  label="Zip Code"
                  variant="outlined"
                  fullWidth
                  value={updatedAccount.zip}
                  onChange={handleChange}
                  className={classes.inputWrapper}
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save changes
            </Button>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.User.userId,
    username: state.User.username,
    email: state.User.email,
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
