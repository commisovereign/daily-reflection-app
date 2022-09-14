const ProductivityLineChartConfig = (date,productivityScores)=>
{
    const productivityChartConfig ={
        type:'line',
        data:{
            labels: date,
            dataSets:[
                {
                    label:"Productivity Over Time",
                    data: productivityScores
                }
            ]
        }
    }
    return productivityChartConfig;

}
export default ProductivityLineChartConfig;