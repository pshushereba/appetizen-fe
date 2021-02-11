import React from "react";
import { Card, CardContent, Chip, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    position: "absolute",
    top: "16px",
    right: "16px",
    height: "20px",
    padding: "4px 0",
    fontSize: "85%",
    backgroundColor: `${(props) => theme.palette.secondary.light}`,
    color: `${(props) => props.theme.palette.common.white}`,
    marginBottom: `${(props) => props.theme.spacing(4)}px`,

    "& span": {
      paddingLeft: `${(props) => props.theme.spacing(2)}px`,
      paddingRight: `${(props) => props.theme.spacing(2)}px`,
    },
  },
  card: {
    backgroundColor: theme.palette.secondary.light,
  },
  cardContent: {
    position: "relative",
  },
  percentage: {
    color: `${(props) => props.percentageColor}`,
    fontWeight: `${(props) => props.theme.typography.fontWeightBold}`,
    background: `${(props) => rgba(props.percentageColor, 0.1)}`,
    padding: "2px",
    borderRadius: "3px",
    marginRight: `${(props) => props.theme.spacing(2)}px`,
  },
}));

const StatsTile = ({ percentageColor, title, amount }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h3" mb={6}>
            <Box>{amount}</Box>
          </Typography>
          <Typography variant="subtitle2" className={classes.percentage}>
            <span>17%</span> Since last week
          </Typography>
          <Chip label="Monthly" className={classes.chip} />
        </CardContent>
      </Card>
    </>
  );
};

export default StatsTile;
