import React, { useState } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import VideocamIcon from "@material-ui/icons/Videocam";

const StreamControls = ({ mediaRecorder }) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);

  function startRecording() {
    setRecording(true);
    mediaRecorder.start();
  }

  function stopRecording() {
    setRecording(false);
    mediaRecorder.stop();
  }

  function pauseRecording() {
    setPaused(true);
    mediaRecorder.pause();
  }

  function resumeRecording() {
    setPaused(false);
    mediaRecorder.resume();
  }

  return (
    <div>
      <VideocamIcon />
      <PlayArrowIcon />
      <PauseIcon />
      <StopIcon />
    </div>
  );
};

export default StreamControls;
