import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js/auto';
import ChartConfig1 from './ChartConfig1';

//NOT IN USE

const Chart1 = ({chartDayData}) => {

  const reflects = useRef(null);
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  const fetchDataForGraph = async () =>{
    const res = await fetch('http://localhost:5001/reflections');
    const data = await res.json();
    reflects.current = await data;
    console.log(data)
    console.log(reflects.current)
    return data
  }
  const getDaysForGraph = async () =>{
    await fetchDataForGraph()
    var a = reflects.current.map((x)=>x.day);
    var date = [];
    for(let day in a){
      date.push(a[day].slice(0,10));
    }
    return date;
  }
  const getDayScoreForGraph = async () =>{
    await fetchDataForGraph()
    const feels = reflects.current.map((x)=>x.dayScore);
    return feels;
  }

  useEffect(() => { 
    const makeChart = async () =>{
      if (chartContainer && chartContainer.current) {
        const days = await getDaysForGraph()
        const dayScore = await getDayScoreForGraph();
        const chartConfig = ChartConfig1(days,dayScore);
        const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
        setChartInstance(newChartInstance);
      }
    }
    makeChart()
  }, [chartContainer])
  return (
    <div> 
      <canvas ref={chartContainer} /> 
    </div>);


 /* const a = chartDayData
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
}; 

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
  );*/
  
}
export default Chart1