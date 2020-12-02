import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Chat from "../chat/Chat.js";
import axios from "axios";
import UserCard from "../UserCard.js";

const Explore = (props) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const { setMenuItem } = props;
  useEffect(() => {
    axios
      .get("http://localhost:5000/active")
      .then((res) => setActiveUsers(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Grid container spacing={10}>
        <Grid item sm={6}>
          <div id="viewer-video"></div>
        </Grid>
        <Grid item sm={3}>
          {activeUsers.map((user) => {
            return <UserCard data={user} setMenuItem={setMenuItem} />;
          })}
          {console.log(activeUsers)}
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;
