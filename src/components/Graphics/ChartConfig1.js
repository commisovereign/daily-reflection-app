
const ChartConfig1 = (a) => {
    console.log(a+'xyz')

    const chartConfig = {
        type: 'line',
        data: {
          labels:a,
          datasets:[
              {
                  label:'Example',
                  data:[
                      1,
                      2,
                      3
                  ],
                  backgroundColor:[
                      'red',
                      'green',
                      'rgba(255,99,132,.06)'
                  ]
              }
          ]
      
      
        },
        options: {
          maintainAspectRatio:false
        }
      };
  return chartConfig;
}


export default ChartConfig1