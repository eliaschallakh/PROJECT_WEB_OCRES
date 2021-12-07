import React from "react";
import "./App.css";
import ApexCharts from 'react-apexcharts'
import Chart from 'react-apexcharts'
function Graph(props) {
    let top = {};
    if (props.topPlayers !== null) {
        top = props.topPlayers.data;
    }
    let slicedArray = [];
    let titles = [];
    let goal = [];
    if(top !== undefined && Object.keys(top).length !== 0){
        slicedArray = top.slice(0, 10);
        titles = slicedArray.map(obj => obj.player.player_name);
        goal = slicedArray.map(obj => obj.goals.overall);
    }
    const options = {
        xaxis: {
            categories: titles
        },
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#000']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#000']
        },
        tooltip: {
            shared: true,
            intersect: false
        },

    };
    const series = [{
        name: 'English Premier League',
        data: goal
    }]
    return (
        <div style={{width:'500px'}}>
            <Chart options={options} series={series} type="bar" className={"graphWidth"} height={520} />
        </div>
    );
}
export default Graph;