import React, { useState } from "react";
import Dropzone from "./Dropzone.js";
import { connect } from "react-redux";

const Upload = () => {
  const [file, setFile] = useState({});

  const onFileAdded = (file) => {
    setFile(file[0]);
  };

  const sendRequest = (file) => {
    const formData = new FormData();
    formData.append("photo", file, file.name);

    // Will need action for updateProfilePicture
  };

  return (
    <div>
      <Dropzone onFileAdded={onFileAdded} />
    </div>
  );
};

export default Upload;
