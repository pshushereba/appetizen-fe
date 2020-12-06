import React, { useState } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import VideocamIcon from "@material-ui/icons/Videocam";

const StreamControls = ({ mediaRecorder, stoppedVideo }) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);

  function startRecording() {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      setRecording(true);
      console.log("");
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
    <div>
      <VideocamIcon onClick={startRecording} />
      <PlayArrowIcon />
      <PauseIcon onClick={pauseRecording} />
      <StopIcon onClick={stopRecording} />
    </div>
  );
};

export default StreamControls;
