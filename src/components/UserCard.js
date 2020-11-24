import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const UserCard = (props) => {
  const { username, room } = props.data;
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
          <Button size="small">View Stream</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserCard;
