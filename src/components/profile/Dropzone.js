import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core";
import Button from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const Dropzone = (props) => {

  const fileListToArray = (list) => {
      const array = [];

      for (let i = 0; i < list.length; i++) {
          array.push(list.item(i));
      }

      array[0].path = URL.createObjectURL(list[0]);

      return array
}

  const onFileAdded = (evt) => {
    const files = evt.target.files;
    if (props.onFileAdded) {
      const array = fileListToArray(files);
      props.onFileAdded(array);
    }
  }

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
    <div>
      <Avatar />
      <CloudUploadIcon onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} />
      <Input type="file" />
      <Button>Change Profile Picture</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  avatar: state.User.avatar_img,
};

export default connect(mapStateToProps, {})(Dropzone);
