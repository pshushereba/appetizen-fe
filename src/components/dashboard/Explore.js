import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, connect } from "react-redux";
import { getActiveUsers } from "../../actions/index.js";
import UserCard from "../UserCard.js";

const Explore = ({ activeUsers, setMenuItem }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveUsers);
  }, []);

  console.log(activeUsers);
  return (
    <>
      <Grid container spacing={8}>
        <Grid container spacing={1} justify="space-around">
          {activeUsers.map((user) => {
            return (
              <Grid item sm={3}>
                <UserCard data={user} setMenuItem={setMenuItem} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    activeUsers: state.Stream.activeUsers,
  };
};

export default connect(mapStateToProps, getActiveUsers)(Explore);
