import React from "react";
import { initiateChatSocket } from "../utils/socketHelpers.js";

const ViewStream = () => {
  const viewerChatSocket = initiateChatSocket(username, roomId);
  return (
    <>
      <h1>Test</h1>
    </>
  );
};

export default ViewStream;
