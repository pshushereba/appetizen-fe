import React, { useState } from "react";
import Dropzone from "./Dropzone.js";
import { connect } from "react-redux";
import { updateProfilePicture } from "../../actions/index.js";

const Upload = () => {
  const [file, setFile] = useState({});

  const onFileAdded = (file) => {
    setFile(file[0]);
  };

  const sendRequest = (file) => {
    const formData = new FormData();
    formData.append("photo", file, file.name);

    updateProfilePicture(user_id, formData);
  };

  return (
    <div>
      <Dropzone onFileAdded={onFileAdded} />
      <Button type="submit" onClick={sendRequest} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.User.userId,
  };
};

export default connect(mapStateToProps, {})(Upload);
