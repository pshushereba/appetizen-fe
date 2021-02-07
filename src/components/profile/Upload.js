import React, { useState } from "react";
import Dropzone from "./Dropzone.js";
import { connect, useDispatch } from "react-redux";
import { updateProfilePicture } from "../../actions/index.js";
import { Button, Grid } from "@material-ui/core";

const Upload = ({ user_id }) => {
  const [file, setFile] = useState({});
  const dispatch = useDispatch();

  const onFileAdded = (photo) => {
    console.log("in Upload onFileAdded", photo[0].path);
    setFile(photo[0]);
  };
  console.log("useState file", file);

  const sendRequest = () => {
    const formData = new FormData();
    formData.append("photo", file, file.name);
    dispatch(updateProfilePicture(user_id, formData));
  };

  return (
    <>
      <Grid
        container={true}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item={true} justifyContent="center" alignContent="center">
          <Dropzone onFileAdded={onFileAdded} />
          <Button type="submit" onClick={sendRequest}>
            Test Photo Upload
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.User.userId,
  };
};

export default connect(mapStateToProps, { updateProfilePicture })(Upload);
