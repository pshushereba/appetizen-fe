import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Chat from "../chat/Chat.js";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { getActiveUsers } from "../../actions/index.js";
import UserCard from "../UserCard.js";

const Explore = (props) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const { setMenuItem } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/active")
      .then((res) => setActiveUsers(res.data))
      .catch((err) => console.log(err));
    // dispatch(getActiveUsers);
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

// export default connect(mapStateToProps, getActiveUsers)(Explore);
export default Explore;
