import React, { useEffect, useRef ,useState } from 'react';
import Chart from 'chart.js/auto';
import ProductivityLineChartConfig from "./ProductivityLineChartConfig";

const ProductivityLineChart = ({reflections}) =>{
    
  const chartContainer = useRef(null);

  useEffect(() => {
    const makeChart = async () =>{
      const data = await reflections;
          //sorts reflections by date in ascending order
      const sortedRefs = await data.map(({idreflections,dates,dayScore,productivityScore,notes})=>{
        dates = dates.slice(0,10).replace(/-/g,'');
        return {idreflections,dates,dayScore,productivityScore,notes}}
      ).sort((x,y)=>x.dates -y.dates);
          //Adds slashes to dates
      const fullDates = await sortedRefs.map((x)=>x.dates).map((a)=>a.slice(0, 4) + "/" + a.slice(4, 6) + "/" + a.slice(6, 8));
          // takes the sorted productivity score 
      const prod = await sortedRefs.map((x)=>x.productivityScore);

      if (chartContainer && chartContainer.current) {
        const chartConfig = ProductivityLineChartConfig(fullDates,prod);
        const newChartInstance = new Chart(chartContainer.current, chartConfig);
      }
    }
    makeChart()
  }, [chartContainer])

    return(
        <div>

            <canvas id='productivityScoreChart1' 
            ref={chartContainer}>
            </canvas> 

        </div>
    )
}
export default ProductivityLineChart;