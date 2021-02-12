import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { green, red, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
  cardContent: {
    "&:lastChild": {
      paddingBottom: `${theme.spacing(4)}px`,
    },
  },
  chartWrapper: {
    height: "168px",
    position: "relative",
  },
  tableRow: {
    height: "42px",
    "&:last-child th": {
      borderBottom: 0,
    },
    "&:last-child td": {
      borderBottom: 0,
    },
  },
  tableCell: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const RevenueWidget = () => {
  const theme = useTheme();
  const classes = useStyles();
  const data = {
    labels: ["Social", "Search Engines", "Direct", "Other"],
    datasets: [
      {
        data: [260, 125, 164],
        backgroundColor: [theme.palette.secondary.main, red[500], orange[500]],
        borderWidth: 5,
        borderColor: theme.palette.background.paper,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Revenue"
        />
        <CardContent>
          <div>
            <Doughnut data={data} options={options} />
          </div>
          <Table>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Plan</TableCell>
                <TableCell className={classes.tableCell} align="right">
                  Revenue
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  Lite
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  260
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  <Typography>+35%</Typography>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  Basic
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  125
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  <Typography>-12%</Typography>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  Pro
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  164
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  <Typography>+46%</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueWidget;
