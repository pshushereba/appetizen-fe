import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const Dropzone = () => {
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
  };

  return (
    <div>
      <Avatar />
      <CloudUploadIcon onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} />
      <Input type="file" />
    </div>
  );
};

const mapStateToProps = (state) => {
  avatar: state.User.avatar_img,
};

export default connect(mapStateToProps, {})(Dropzone);
