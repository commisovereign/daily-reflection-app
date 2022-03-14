import React,{ Component } from 'react';
import { Line} from 'react-chartjs-2';

class LineChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
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
            }
        }
    }
    render(){
        return(
            <div className="chart">
                <Line
                data ={this.state.chartData}

                options={{}}
                />
            </div>
        )
    }
}

export default LineChart