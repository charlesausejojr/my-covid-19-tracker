import React,{useState,useEffect} from 'react'
import "./LineGraph.css"
import {Line} from "react-chartjs-2"
import numeral from 'numeral';


const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;

    for(let date in data.cases) {
        if(lastDataPoint){
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,     
            };
            chartData.push(newDataPoint);
        }
        
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};



function LineGraph({casesType}) {

    

                    //casesType default as cases
    const [data,setData] = useState({});
  
  
    useEffect(() =>{
        
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const chartData = buildChartData(data,casesType);
           
            setData(chartData);
        });

    },[casesType]);

    return (
        <div className="lineGraph">
        {/* this is to check if there is data in the first place */}
            {data?.length > 0 &&  
                (<Line
                options={options}
                data={
                    {
                        datasets:[
                            {
                                backgroundColor: "#EB7762",
                                borderColor: "#CC1034",
                                data: data, 
                            },
                        ],
                    }
                }

            />)
            }
           
        </div>
    )
}

export default LineGraph
