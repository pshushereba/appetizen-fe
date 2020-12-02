import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams, Link } from "react-router-dom";

const UserCard = (props) => {
  const { streamId, room } = props.data;
  const { username } = useParams();
  const history = useHistory();
  console.log("history", history);
  console.log("props", props);
  console.log("username", username);
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {streamId}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            component={Link}
            onClick={() => {
              history.push(`/streams/${room}`, {
                state: { username: streamId, roomID: room, viewer: username },
              });
              props.setMenuItem("viewstream");
            }}
          >
            View Stream
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserCard;
