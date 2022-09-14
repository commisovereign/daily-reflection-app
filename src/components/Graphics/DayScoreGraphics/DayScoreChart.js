import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js/auto';
import DayScoreLineChartConfig from './DayScoreLineChartConfig';



const Chart1 = ({chartDayData}) => {

  const reflects = useRef(null);
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  const fetchDataForGraph = async () =>{
    const res = await fetch('http://localhost:5001/reflections');
    const data = await res.json();
    reflects.current = await data;
    //sorts reflections by date in ascending order
    reflects.current = reflects.current.map(({day,dayScore,productivity,notes,id})=>{
      day = day.slice(0,10).replace(/-/g,'');
      return {day,dayScore,productivity,notes,id}}
    ).sort((x,y)=>x.day -y.day);

    return data;
  }
  const getDaysForGraph = async () =>{
    await fetchDataForGraph();
    var fullDates = reflects.current.map((x)=>x.day);
    fullDates = fullDates.map((a)=>a.slice(0, 4) + "/" + a.slice(4, 6) + "/" + a.slice(6, 8));
    return fullDates;
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
        const chartConfig = DayScoreLineChartConfig(days,dayScore);
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