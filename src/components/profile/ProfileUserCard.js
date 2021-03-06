import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Upload from "./Upload.js";
import { connect } from "react-redux";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: theme.spacing(3),
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProfileUserCard = ({ avatar }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item={true} xs={12} md={4} lg={10}>
        <Card className={classes.card}>
          <CardContent>
            <Box className={classes.avatarWrapper}>
              <Avatar
                src={avatar}
                className={classes.avatar}
                onClick={handleOpen}
              />
              <Modal
                open={open}
                onClose={handleClose}
                style={getModalStyle()}
                onBackdropClick={handleClose}
              >
                <Upload className={classes.paper} />
              </Modal>
            </Box>
            <Box textAlign="center" pt={3}>
              <Typography variant="body2" component="p">
                Test 1
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Test 2
              </Typography>
              <Box mt={2}>
                <Typography variant="body1" component="p">
                  test 3
                </Typography>
              </Box>
              <Button>Subscribe</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    avatar: state.User.avatar_img,
  };
};

export default connect(mapStateToProps, {})(ProfileUserCard);
