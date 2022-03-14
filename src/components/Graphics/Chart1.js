import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js/auto';

const chartConfig = {
  type: 'bar',
  data: {
    labels:['One','Two','Three'],
    datasets:[
        {
            label:'Example',
            data:[
                1,
                2,
                3
            ],
            backgroundColor:[
                'rgba(255,99,132,.06)',
                'rgba(255,99,132,.06)',
                'rgba(255,99,132,.06)'
            ]
        }
    ]


  },
  options: {
    // ...
  }
};

const Chart1 = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
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