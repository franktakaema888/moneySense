import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import { Bar } from 'react-chartjs-2';
import axios from "axios";

//import chart elements
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
//register the chart elements 
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
);

const BarChart = () => {

    //link api file from backend to get avergae item price in Singapore
    const url = 'http://localhost:5002/api/api_country';
    //allows the totalBalance() from globalCOntext.js to be used
    const { totalBalance } = useGlobalContext();
    //initalises state to save api data in SgData
    const [SgData, setSgData] = useState([]); 
    // New state to hold the average price
    const [averagePrice, setAveragePrice] = useState(0); 
    
    //this function gets the data from the countries api and updates the state of SgData
    const fetchInfo_sg = async () => {
        try {
            const response = await axios.get(`${url}?country=Singapore`); //api call
            setSgData(response.data.prices); //update state
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.log('Response data:', error.response.data);
            }
        }
    };
    //runs the function inside on initial render
    useEffect(() => {
        fetchInfo_sg();
    }, []);
    //runs the function inside everytime there are changese in SgData
    useEffect(() => {
        const calculateAveragePrice = async () => {
            //checks if the database has any entries
            if (SgData.length === 0) {
                setAveragePrice(0);
                return;
            }
            //returns a single value from SgData after adding the prices together starting from index 0 in the array
            const sumOfPrices = SgData.reduce((sum, item) => sum + item.average_price, 0);
            //finding the average price of all the item prices
            const averagePrice = sumOfPrices / SgData.length;
            //updates the state of averagePrice
            setAveragePrice(averagePrice.toFixed(1));
        };
        //runs the function declared above
        calculateAveragePrice();
    }, [SgData]);

    //Initialises the data to be used in the bar graph
    const data = {
        labels: ['Avg Cost of Living', 'Balance'],
        datasets: [
            {
                label: 'Average Price',
                data: [averagePrice, 0], // Use the calculated average price here
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1,
            },
            {
                label: 'Total Balance',
                data: [0, totalBalance()], //Use totalBalance() from globalContext
                backgroundColor: 'orange',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };
    
    //customisation of bar graph
    const options = {
        indexAxis: 'y', // Display bars vertically
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                stacked: true, // Stacked bars for the two datasets
            },
            y: {
                beginAtZero: true,
                stacked: true, // Stacked bars for the two datasets
            },
        },
    };

    //returns the html with data placed in a bar graph
    return (
        <div className="">
            <Bar
                data={data}
                options={options}
            ></Bar>
        </div>
    );
}

export default BarChart;
