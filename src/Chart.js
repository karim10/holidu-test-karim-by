import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";
import PropTypes from "prop-types";

export default function Chart({ chartData, chartType }) {
  return (
    <React.Fragment>
      <Title>Score statistics</Title>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey={chartType} />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Average score
            </Label>
          </YAxis>
          <Bar type="monotone" dataKey="score" fill="#556CD6" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

Chart.propTypes = {
  chartType: PropTypes.oneOf(["byCountry", "byGender"]).isRequired,
  chartInfo: PropTypes.array.isRequired
};
