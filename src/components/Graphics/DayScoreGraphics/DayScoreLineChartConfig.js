
const DayScoreLineChartConfig = (date,dayScore) => {
    const chartConfig = {
        type: 'line',
        data: {
          labels: date,

          datasets:[
              {
                  label:"Day Scores Over Time",
                  data: dayScore,

                  backgroundColor:[
                      'purple'
                  ],
                  borderColor:['black']
                  
                  
              }
          ]
      
      
        },
        options: {
          maintainAspectRatio:false
        }
      };
  return chartConfig;
}


export default DayScoreLineChartConfig