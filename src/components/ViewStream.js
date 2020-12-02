import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { initiateChatSocket } from "../utils/socketHelpers.js";

const ViewStream = () => {
  const history = useHistory();
  const { username, id } = useParams();
  console.log(history);
  console.log(username, id);
  // const viewerChatSocket = initiateChatSocket(username, roomId);
  return (
    <>
      <h1>Test</h1>
    </>
  );
};

export default ViewStream;
