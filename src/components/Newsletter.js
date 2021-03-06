import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
//import newsletter from "./../util/newsletter.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { subscribeToNewsletter } from "../actions/index.js";

function Newsletter(props) {
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSubscriberEmail(e.target.value);
  };

  const onSubmit = (subscriberEmail) => {
    dispatch(subscribeToNewsletter(subscriberEmail));
    setSubscribed(true);
  };

  return (
    <>
      {subscribed === false && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={true}>
              <TextField
                variant="outlined"
                type="email"
                label="Email"
                name="email"
                value={subscriberEmail}
                onChange={handleChange}
                error={errors.email ? true : false}
                helperText={errors.email && errors.email.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter an email address",
                })}
              />
            </Grid>
            <Box display="flex" alignItems="stretch" clone={true}>
              <Grid item={true} xs="auto">
                <Button
                  variant="contained"
                  color={props.buttonColor}
                  size="large"
                  type="submit"
                >
                  {props.buttonText}
                </Button>
              </Grid>
            </Box>
          </Grid>
        </form>
      )}

      {subscribed === true && <div>{props.subscribedMessage}</div>}
    </>
  );
}

export default Newsletter;
