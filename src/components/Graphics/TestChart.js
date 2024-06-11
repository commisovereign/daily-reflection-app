import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;


const Chart2 = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current,  {
        type: "bar",
        data: {
          
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [randomInt(), 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          
          onClick: (e) =>{
            const canvasPosition = getRelativePosition(e, newChartInstance);
            const dataX = newChartInstance.scales.x.getValueForPixel(canvasPosition.x);
            const dataY = newChartInstance.scales.y.getValueForPixel(canvasPosition.y);
            console.log("X:"+dataX+" Y:"+dataY);
          },
          scales: {
            /*yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]*/
          }
        }
        
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);
  
  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };
  
  const onButtonClick = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt()
    ];
    updateDataset(0, data);
  };
  
  return (
    //style={{display:"flex", flexDirection:"column",boxSizing:"border-box", width: "70%", justifyContent:"center", margin:"2%", position:"relative"}
    <div >
      <canvas ref={chartContainer}  />
      <button onClick={onButtonClick}>Randomize!</button>
    </div>
  );
};

export default Chart2;
