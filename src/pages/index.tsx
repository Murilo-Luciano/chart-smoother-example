import React, { useRef, useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import chartSmoother from "chart-smoother";

/**@todo: centralizar div dos graficos */
/**@todo: bloqueio do limite de iterações*/
/**@todo: botão de ver ou não os "pontinhos" do grafico*/
/**@todo: adicição e remoção de pontos do grafico*/

/**@todo: mudança do numero de iterações*/

const initialData = [
  [0, 0],
  [1, 4],
  [2, 12],
  [3, 5],
  [4, 0],
];

export default function Home() {
  const [iterations, setIterations] = useState(1);
  const [showDots, setShowDots] = useState(true);
  const [data, setData] = useState(initialData);
  const [newX, setNewX] = useState(0);
  const [newY, setNewY] = useState(0);

  useEffect(() => {
    if (iterations > 6) {
      console.log("ITERATION LIMIT");
      setIterations(6);
    }
  }, [iterations]);

  const data2 = chartSmoother(data, iterations);

  return (
    <>
      <div className="chartsContainer">
        <div>
          <LineChart width={900} height={600}>
            <Line
              type="linear"
              dataKey="pv"
              stroke="#FF0000"
              strokeWidth={2}
              dot={showDots}
              data={data.map((d) => ({ name: d[0], pv: d[1] }))}
            />
          </LineChart>
        </div>
        <div className="smoothedChartContainer">
          <LineChart width={900} height={600}>
            <Line
              type="linear"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
              dot={showDots}
              data={data2.map((d: number[]) => ({ name: d[0], pv: d[1] }))}
            />
          </LineChart>
        </div>
      </div>

      <div className="chartOptions">
        <div className="pointsDisplay">
          {data.map((d) => (
            <p>
              X: {d[0]} Y: {d[1]}
            </p>
          ))}
        </div>
        <button onClick={() => setData(data.slice(0, data.length - 1))}>
          -
        </button>
        <label>
          X<input onChange={(e) => setNewX(Number(e.target.value))} />
        </label>
        <label>
          Y<input onChange={(e) => setNewY(Number(e.target.value))} />
        </label>
        <button onClick={() => setData([...data, [newX, newY]])}>+</button>

        <button onClick={() => setShowDots(!showDots)}>SHOW DOTS</button>

        <label>iterations: </label>
        <input
          type="number"
          min={1}
          max={6}
          onChange={(e) => setIterations(Number(e.target.value))}
        />
      </div>
    </>
  );
}
