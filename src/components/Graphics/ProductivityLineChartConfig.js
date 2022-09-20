const ProductivityLineChartConfig = (date,productivityScores)=>{
    const productivityChartConfig ={
        type:'line',
        data:{
            labels: date,
            datasets:[
                {
                    label:"Productivity Over Time",
                    data: productivityScores,
                    backgroundColor:[
                        'green'
                    ],
                    borderColor:['black']
                    

                }
            ]
        },
        options: {
          maintainAspectRatio:false
        }
    }
    return productivityChartConfig;

}
export default ProductivityLineChartConfig;