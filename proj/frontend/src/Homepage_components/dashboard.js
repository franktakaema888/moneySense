import { useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
// import Comparison from "../Homepage_components/comparison";
import Chart from "../chart/chart";
// import BarChart from "../chart/barChart";

/** Display Total Funds
 * - Shows Balance, Income and Expense of the user
 */
const Dashboard = () => {
	//returns the functions from globalContext.js
	const {incomes, expenses, getIncomes, getExpenses, totalIncome, totalExpense, totalBalance} = useGlobalContext()

	useEffect(() => {
		getIncomes();
		getExpenses();
	}, []);

	return (
		<div className= "py-10 bg-gray-100">
			<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
				<div className="md:col-span-3 bg-white rounded-lg shadow-md p-6">
					<div className="grid grid-cols-1 gap-4 mt-6">
						<div className="bg-purple-100 rounded-lg p-4">
							<h1>Total Income: ${totalIncome()} </h1>
						</div>
						<div className="bg-blue-100 rounded-lg p-4">
							<h1>Total Expense: ${totalExpense()} </h1>
						</div>
						<div className="bg-green-100 rounded-lg p-4">
							<h1>Total Balance:  ${totalBalance()} </h1>
						</div>
					</div>
				</div>
				<div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
					<RecentTransactions/>
				</div>
				<div className="md:col-start-1 md:col-span-3 bg-white rounded-lg shadow-md p-6">
					<Chart/>
				</div>	
                <div className=" md:col-span-2 bg-white rounded-lg shadow-md p-6 ">
					<h1>How do you fair in Singapore?</h1>
                    <div className="">
						{/* <BarChart/> */}
                        {/* <Comparison/> */}
                    </div>
				</div>	
			</div>
		</div>
	);
};

/** Transaction History
 * This component uses functions from the globalContext.js file to get the most recent transactions made
 */
const RecentTransactions = () => {
	//Links the transactionHistory function from globalContext.js
    const {transactionHistory} = useGlobalContext();

    const[...history] = transactionHistory();

    return (
        <div >
            <h2>Recent Transactions:</h2>
				{history.map((item) => {
					const {_id, title, amount, type} = item;

					return (
						<div key={_id} className="bg-gray-100 border-2 border-white shadow-md p-4 rounded-lg flex justify-between items-center">
							<p className={ type === 'expense' ? "text-red-500" : "text-green-500"}>
								{title}
							</p>
							<p className={ type === 'expense' ? "text-red-500" : "text-green-500"}>
								{type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
							</p>
						</div>
					);
				})}
        </div>
    );
}

export default Dashboard;