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
    const { incomes, expenses } = useGlobalContext();

    // Create a combined list of all transactions, sorted by date
    const combinedTransactions = [...incomes, ...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Create an object to hold summed amounts for each date, for incomes and expenses separately
    const amountsByDate = combinedTransactions.reduce((acc, transaction) => {
        const dateString = new Date(transaction.date).toLocaleDateString();
        if (!acc[dateString]) {
            acc[dateString] = { income: 0, expense: 0 };
        }
        acc[dateString][transaction.type] += transaction.amount;
        return acc;
    }, {});

    // Now create arrays for the chart data using the accumulated amounts
    const chartData = Object.entries(amountsByDate).reduce(
        (acc, [date, amounts]) => {
            acc.labels.push(date);
            acc.incomeData.push(amounts.income);
            acc.expenseData.push(amounts.expense);
            return acc;
        },
        { labels: [], incomeData: [], expenseData: [] }
    );

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Income',
                data: chartData.incomeData,
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                borderColor: 'green',
                borderWidth: 1,
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: chartData.expenseData,
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'red',
                borderWidth: 1,
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
