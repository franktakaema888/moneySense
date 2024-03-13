import React from 'react';
import { useGlobalContext } from '../context/globalContext';
import { Line } from 'react-chartjs-2';

//import chart elements
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
//register chart elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const Chart = () => {
    //allows "income" and "expenses" variable from useGlobalContext to be used
    const { incomes, expenses } = useGlobalContext();

    //iterate through and create new array of income from current user
    const incomeData = incomes.map(inc => inc.amount); 
    //iterate through and create new array of expenses from current user
    const expenseData = expenses.map(exp => exp.amount); 

    //create arrays of income and expense dates
    const incomeDates = incomes.map(inc => new Date(inc.date).toLocaleDateString());
    const expenseDates = expenses.map(exp => new Date(exp.date).toLocaleDateString());
    //combine income and expense dates
    const allDates = [...incomeDates, ...expenseDates];
    //remove duplicate dates by converting the array to a Set and back to an array
    const uniqueDates = Array.from(new Set(allDates));

    //Initialises data to be used in Line graph
    const data = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'green',
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'red',
                tension: 0.2,
            },
        ],
    };

    const options = {

    };
    //returns the html with data placed in a Line graph
    return (
        <div className="max-w-full">
            <Line 
                data={data}
                options={options}
             />
        </div>
    );
};

export default Chart;
