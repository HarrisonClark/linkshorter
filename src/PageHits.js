import React from "react";
import bb from "billboard.js";

export default function PageHits({ shortURL }) {
  let chart;
  if (shortURL) {
    chart = bb.generate({
      bindto: "#chart",
      data: {
        type: "line",
        columns: [["data1", 30, 200, 100, 400, 150, 250]],
      },
    });
  } else {
    if (chart) {
      chart.hide();
    }
  }
  return <div id="chart"></div>;
}
