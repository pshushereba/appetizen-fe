import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { Input, Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";

const Dropzone = (props) => {
  const fileListToArray = (list) => {
    const array = [];

    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }

    array[0].path = URL.createObjectURL(list[0]);

    return array;
  };

  const onFileAdded = (evt) => {
    const files = evt.target.files;
    // When a file is added, it is stored in a FileList. We move the file info into an array to work with it.
    console.log("in onFileAdded", files);
    if (props.onFileAdded) {
      const array = fileListToArray(files);
      props.onFileAdded(array);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (props.onFileAdded) {
      const array = fileListToArray(files);
      props.onFileAdded(array);
    }
  };

  return (
    <>
      <IconButton>
        <CloudUploadIcon
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <Input type="file" onChange={onFileAdded} />
        </CloudUploadIcon>
      </IconButton>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    avatar: state.User.avatar_img,
  };
};

export default connect(mapStateToProps, {})(Dropzone);
