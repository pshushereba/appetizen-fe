import React, { useEffect } from "react";
import {
  useHistory,
  useParams,
  useLocation,
  withRouter,
} from "react-router-dom";
import {
  initiateChatSocket,
  initiateVideoSocket,
  disconnectSocket,
} from "../../utils/socketHelpers.js";
import Chat from "../chat/Chat.js";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const ViewStream = ({ peer, streamerPeerId, ...props }) => {
  const history = useHistory();
  // const { id } = useParams();
  const location = useLocation();
  const room = props.match.params.id;
  const viewerPeer = peer;
  // const streamerPeerId = streamerPeerId;
  const viewerVideoSocket = initiateVideoSocket(
    room,
    props.username,
    props.viewerPeerId
  );

  const viewerChatSocket = initiateChatSocket(room, props.username);
  let streamerVideoDiv;

  useEffect(() => {
    viewerVideoSocket.emit("viewer-connected", room, props.username, peer.id);

    viewerPeer.on("call", (call) => {
      call.answer();
      call.on("stream", (stream) => {
        streamerVideoDiv = document.getElementById("streamer-video");
        const content = document.createElement("video");
        content.srcObject = stream;
        content.addEventListener("loadedmetadata", () => {
          content.play();
        });
        streamerVideoDiv.append(content);
      });
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <>
      <Grid container direction="column" justify="space-between" spacing={10}>
        <Grid item xs={8} sm={6}>
          <div id="streamer-video"></div>
        </Grid>
        <Grid item sm={4}>
          <Chat
            username={props.username}
            roomId={props.match.params.id}
            socket={viewerChatSocket}
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.User.username,
    viewerPeerId: state.User.peer.id,
    peer: state.User.peer,
  };
};

export const MemoizedViewStream = React.memo(
  withRouter(connect(mapStateToProps, {})(ViewStream))
);
