import React from "react";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    "&:lastChild": {
      paddingBottom: `${theme.spacing(4)}px`,
    },
  },
  chartWrapper: {
    height: "242px",
    width: "100%",
  },
}));

const BarChart = () => {
  const classes = useStyles();
  const theme = useTheme();
  const firstDatasetColor = theme.palette.secondary.main;
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Views",
        backgroundColor: firstDatasetColor,
        borderColor: firstDatasetColor,
        hoverBackgroundColor: firstDatasetColor,
        hoverBorderColor: firstDatasetColor,
        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cornerRadius: 2,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          stacked: true,
          ticks: {
            stepSize: 20,
            fontColor: theme.palette.text.secondary,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            color: "transparent",
          },
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Card mb={3}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Views"
        ></CardHeader>
        <CardContent className={classes.cardContent}>
          <div className={classes.chartWrapper}>
            <Bar data={data} options={options} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarChart;
