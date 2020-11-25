import React from "react";
import Nav from "./Nav.js";
import { useHistory } from "react-router-dom";
import { initiateChatSocket } from "../utils/socketHelpers.js";

const ViewStream = () => {
  const history = useHistory();
  console.log(history.state);
  // const viewerChatSocket = initiateChatSocket(username, roomId);
  return (
    <>
      <Nav />
      <h1>Test</h1>
    </>
  );
};

export default ViewStream;
