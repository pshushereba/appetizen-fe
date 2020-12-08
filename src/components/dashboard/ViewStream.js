import React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  initiateChatSocket,
  initiateVideoSocket,
} from "../../utils/socketHelpers.js";
import Chat from "../chat/Chat.js";
import { connect } from "react-redux";

const ViewStream = ({ username }) => {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();

  console.log(username, id);
  const viewerVideoSocket = initiateVideoSocket(id, username);
  viewerVideoSocket.emit("viewer-connected", (id, username));
  const viewerChatSocket = initiateChatSocket(id, username);
  return (
    <>
      <h1>Test</h1>
      <Chat username={username} roomId={id} socket={viewerChatSocket} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.User.username,
  };
};

export default connect(mapStateToProps, {})(ViewStream);
