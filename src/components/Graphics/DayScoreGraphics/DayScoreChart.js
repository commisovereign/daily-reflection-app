import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import DayScoreLineChartConfig from './DayScoreLineChartConfig';

const Chart1 = ({reflections, onUpdate}) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  const getReflections = async()=>{
    const data = await reflections;
    return data;
  }
  const sortDates = async()=>{
    const data = await getReflections()
    const sortedDates = await data.map(({idreflections,dates,dayScore,productivityScore,notes})=>{
      dates = dates.slice(0,10).replace(/-/g,'');
      return {idreflections,dates,dayScore,productivityScore,notes}}
    ).sort((x,y)=>x.dates -y.dates);
    var fullDates = await sortedDates.map((x)=>x.dates);
    fullDates = await fullDates.map((a)=>a.slice(0, 4) + "/" + a.slice(4, 6) + "/" + a.slice(6, 8));
    const feels = await sortedDates.map((x)=>x.dayScore);
    return [fullDates,feels];
  }

  useEffect(() => {
    const makeChart = async () =>{
      /*const data = await getReflections()
      const sortedDates = await data.map(({idreflections,dates,dayScore,productivityScore,notes})=>{
        dates = dates.slice(0,10).replace(/-/g,'');
        return {idreflections,dates,dayScore,productivityScore,notes}}
      ).sort((x,y)=>x.dates -y.dates);
      var fullDates = await sortedDates.map((x)=>x.dates);
      fullDates = await fullDates.map((a)=>a.slice(0, 4) + "/" + a.slice(4, 6) + "/" + a.slice(6, 8));
      const feels = await sortedDates.map((x)=>x.dayScore)*/
      const x = await sortDates();
      var fullDates = x[0];
      var feels = x[1];
      if (chartContainer && chartContainer.current) {
        const chartConfig = DayScoreLineChartConfig(fullDates,feels);
        const newChartInstance = new Chart(chartContainer.current, chartConfig);
        setChartInstance(newChartInstance);
      }
    }
    makeChart()
  }, [chartContainer])
/*  const onButtonClick = ()=>{
    chartInstance.data.datasets[0].data = [0,3,5,1,4]
    chartInstance.update();
  }*/
  return (
       <div className='chart'>
        <canvas id='dayScoreChart' 
        ref={chartContainer} /> 
      </div>
    );

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