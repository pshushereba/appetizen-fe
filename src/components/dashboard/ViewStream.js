import React, { useEffect, useContext } from "react";
import { PeerContext } from "../../contexts/index.js";
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
//import Chat from "../chat/Chat.js";
import { MemoizedChat } from "../chat/Chat.js";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const ViewStream = ({ streamerPeerId, viewerPeerId, ...props }) => {
  const history = useHistory();
  // const { id } = useParams();
  const location = useLocation();
  const room = props.match.params.id;
  // const [videoStream, _setVideoStream] = useState(null);
  // const [socketRegistered, setSocketRegistered] = useState(false);
  // const videoStreamRef = useRef(videoStream);
  // const setVideoStream = (data) => {
  //   videoStreamRef.current = data;
  //   _setVideoStream(data);
  // };

  const viewerPeer = useContext(PeerContext);

  const viewerVideoSocket = initiateVideoSocket(
    room,
    props.username,
    viewerPeerId
  );

  const viewerChatSocket = initiateChatSocket(room, props.username);
  let streamerVideoDiv;

  useEffect(() => {
    console.log("viewerPeer useEffect", viewerPeer);
    viewerVideoSocket.emit(
      "viewer-connected",
      room,
      props.username,
      viewerPeerId
    );

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
      <Grid container direction="column" justify="space-around" spacing={10}>
        <Grid item={true} xs={8} sm={6}>
          <div id="streamer-video"></div>
        </Grid>
        <Grid item={true} sm={4}>
          <MemoizedChat
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
    viewerPeerId: state.User.peerId,
    //peer: state.User.peer,
  };
};

export const MemoizedViewStream = React.memo(
  withRouter(connect(mapStateToProps, {})(ViewStream))
);
