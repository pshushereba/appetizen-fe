import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import VideocamIcon from "@material-ui/icons/Videocam";

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing(2),
  },
}));

const StreamControls = ({ mediaRecorder, stoppedVideo }) => {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);

  function startRecording() {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      setRecording(true);
      mediaRecorder.start();
    }
  }

  function stopRecording(e) {
    if (
      (mediaRecorder && mediaRecorder.state === "recording") ||
      (mediaRecorder && mediaRecorder.state === "paused")
    ) {
      setRecording(false);
      mediaRecorder.stop();
      stoppedVideo(e);
    }
  }

  function pauseRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      setPaused(true);
      mediaRecorder.pause();
    }
  }

  function resumeRecording() {
    if (mediaRecorder && mediaRecorder.state === "paused") {
      setPaused(false);
      mediaRecorder.resume();
    }
  }

  return (
    <div className={classes.btnContainer}>
      <VideocamIcon fontSize="large" onClick={startRecording} />
      <PlayArrowIcon fontSize="large" />
      <PauseIcon fontSize="large" onClick={pauseRecording} />
      <StopIcon fontSize="large" onClick={stopRecording} />
    </div>
  );
};

export default StreamControls;
