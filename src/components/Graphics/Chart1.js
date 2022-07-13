import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js/auto';
import ChartConfig1 from './ChartConfig1';

//NOT IN USE

const Chart1 = ({chartDayData}) => {
  const a = chartDayData
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

/*   const [chartData, setChartData] = useState([]);
  const chartElements = (serverData) =>{
    //next line will probably need to be reworked & moved
    setChartData(serverData);
    const chartCon = {
    type: 'line',
    data: {
      labels: chartData.map((x)=>(
        day = x.day
      )),
    }
  }
}; */

//will probably try and move most of this to the app level
 useEffect(() => { 
    if (chartContainer && chartContainer.current) {
      const b = ChartConfig1(a)
      console.log(b+'fefsaas')
      const newChartInstance = new Chartjs(chartContainer.current, b);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}
export default Chart1