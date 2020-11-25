import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams, Link } from "react-router-dom";

const UserCard = (props) => {
  const { username, room } = props.data;
  const { viewer } = useParams();
  const history = useHistory();
  console.log(props);
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {username}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            component={Link}
            onClick={() => {
              history.push({
                pathname: `/${viewer}/streams/${room}`,
                state: { username: username, roomID: room },
              });
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
