import React from "react";
import GaugeChart from "react-gauge-chart";

const Chart = (props) => {
  const data = props.data;
  const label = data.label;
  const confidence = parseFloat(data.confidence.toFixed(2));
  // console.log(label, confidence);
  return (
    <div>
      <h3>Предмет классфицирован: {label}</h3>
      <GaugeChart
        style={{color: 'black'}}
        textColor="black"
        id="gauge-chart3"
        nrOfLevels={3}
        colors={["#FF5F6D", "#FFC371", "rgb(26 202 26)"]}
        arcWidth={0.3}
        percent={confidence}
      />
    </div>
  );
};
export default Chart;
