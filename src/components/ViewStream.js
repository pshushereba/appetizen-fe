import React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { initiateChatSocket } from "../utils/socketHelpers.js";
import Chat from "./chat/Chat.js";

const ViewStream = () => {
  const history = useHistory();
  const { username, id } = useParams();
  const location = useLocation();
  console.log(history.state);
  console.log(username, id);
  const viewerChatSocket = initiateChatSocket(id, username);
  return (
    <>
      <h1>Test</h1>
      <Chat username={username} roomId={id} socket={viewerChatSocket} />
    </>
  );
};

export default ViewStream;
