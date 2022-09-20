import React, { useEffect, useRef ,useState } from 'react';
import Chartjs from 'chart.js/auto';
import ProductivityLineChartConfig from "./ProductivityLineChartConfig";

const ProductivityLineChart = () =>{
    
  const reflects = useRef(null);
  const chartContainer1 = useRef(null);
  const [chartInstance1, setChartInstance1] = useState(null);
  
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
  const getDatesForGraph = async () =>{
    await fetchDataForGraph();
    var fullDates = reflects.current.map((x)=>x.day);
    fullDates = fullDates.map((a)=>a.slice(0, 4) + "/" + a.slice(4, 6) + "/" + a.slice(6, 8));
    return fullDates;
  }
  const getProductivityScoreForGraph = async () =>{
    await fetchDataForGraph()
    const prod = reflects.current.map((x)=>x.productivity);
    return prod;
  }
  useEffect(() => { 
    const makeChart1 = async () =>{
      if (chartContainer1 && chartContainer1.current) {
        const days = await getDatesForGraph()
        const productivity = await getProductivityScoreForGraph();
        const chartConfig1 = ProductivityLineChartConfig(days,productivity);
        const newChartInstance1 = new Chartjs(chartContainer1.current, chartConfig1);
        setChartInstance1(newChartInstance1);
      }
    }
    makeChart1()
  }, [chartContainer1])

    return(
        <div>

            <canvas id='productivityScoreChart1' 
            ref={chartContainer1}>
            </canvas> 

        </div>
    )
}
export default ProductivityLineChart;