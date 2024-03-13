import { useGlobalContext } from '../context/globalContext';
import { Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';


//register chart elements
ChartJS.register(
    CategoryScale,
    Tooltip,
    Legend,
    ArcElement,
);

const PieChart = () => {
   
    const { sortedRecentExpenses} = useGlobalContext();
    const recentExpenses = sortedRecentExpenses();
    const expenseCategories = recentExpenses.map((expense) => expense.category);
    const expenseAmounts = recentExpenses.map((expense) => expense.amount);


    // Adding colors based on categories
    const categoryColors = {
        Rent: "red", 
        Food: "blue", 
        Entertainment: "green", 
        Bills: "yellow",
        Subscription: "purple",
        Medical: "brown",
        Education: "orange",
        Others: "grey",
        
    };

    const categoryAmounts = {};
    
    expenseCategories.forEach((category, index) => {
        if (categoryAmounts[category]) {
            categoryAmounts[category] += expenseAmounts[index];
        } else {
            categoryAmounts[category] = expenseAmounts[index];
        }
    });

      
    const backgroundColors = expenseCategories.map((category) => categoryColors[category] || "grey");
      
    const data ={
        labels: Object.keys(categoryAmounts),
        datasets: [
            {
                data: Object.values(categoryAmounts),
               backgroundColor: backgroundColors,
                
            }
        ]
    }

    const options = {};

    return (
    <div className= "chart">
    <div style={{padding: '20px', width: '80%'}}>
        {data? <Pie data = {data} options={options}/> : 'Loading'}

    </div>
    </div>
    );
}

export default PieChart;