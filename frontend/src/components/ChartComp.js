import React from "react";
import { Line } from "react-chartjs-2";

export default function ChartComp(props) {
   return (
      <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{props.graphT}</h2>
            <Line
                data = {props.data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: props.title
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
   )
}