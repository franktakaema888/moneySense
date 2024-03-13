import axios from "axios";
import { useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import ExpenseForm from "../form/expenseForm";
import BudgetForm from "../form/budgetForm";
import PieChart  from "../chart/pieChart";

export const Expense = () => {

//Expense details start
return (
  <div className="flex flex-col h-screen scroll-smooth overflow-y-auto"> 
   <div className= "py-10 bg-gray-100">
     <div className="grid grid-cols-10 md:grid-cols-10 gap-3">
       <div className="md:col-span-3">
         <div className="grid grid-cols-1 gap-6 mt-6 px-3">
           <div className="md:col-span-3 bg-blue-100 rounded-lg p-2 -mt-6">
          <ExpenseForm/> 
          </div> 
        </div>    
      </div>    
      <div className="md:col-span-4 bg-white rounded-lg p-8">
        <div className="h-screen overflow-y-auto">
          <h1>Your Recent Expenses</h1>
        <ExpenseTransaction/>
        </div>
      </div>	
      <div className="md:col-span-3 gap-3">
        <PieChart/>  
       <div className="md:col-span-3 h-80 w-82 bg-blue-100 rounded-lg shadow-md p-10 mt-4">
        <BudgetForm/>
      </div>
    </div>
    </div>
  </div>
    <div className="flex-grow"></div>
    </div>
);
};

//Expense details end

const ExpenseTransaction = () => {
  //Links the transactionHistory function from globalContext.js
  const { sortedRecentExpenses, getExpenses } = useGlobalContext();

  const recentExpenses = sortedRecentExpenses();

  /** Reloads data everytime there is a new data insert or delete */
  // useEffect(() => {
  //   getExpenses(); // Fetch income data when the component mounts and whenever there are changes
  // }, [expenses]); // Empty dependency array means the effect runs only once after mounting

  const deleteExpense = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5002/auth/delete-expense/${id}`,
        alert("delete sussesful"),

        //Added a refresh function to update budget section
        window.location.reload(false)

      );
    } catch (error) {
      console.error(error); //to handle any errors
    }
  };
 
  /** Reloads data everytime there is a new data insert or delete */
  useEffect(() => {
    getExpenses(); // Fetch income data when the component mounts and whenever there are changes

  }, [deleteExpense]); // Empty dependency array means the effect runs only once after mounting
  return (
      <div style={{ fontSize: '12px'}}>

      <div className="overflow-y-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentExpenses.map((item) => {
              const { _id, title, amount, date, category } = item;

              const dateObject = new Date(date);
              const day = dateObject.getDate();
              const month = dateObject.getMonth() + 1; // Month is 0-indexed, so add 1
              const year = dateObject.getFullYear();

              // Format the date components
              const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;


          return (
            <tr key={_id} className="bg-gray-100">
                  <td className="border px-4 py-2">{title}</td>
                  <td className="border px-4 py-2">${amount <= 0 ? 0 : amount}</td>
                  <td className="border px-4 py-2">{formattedDate}</td>
                  <td className="border px-4 py-2">{category}</td>
                  <td className="border px-4 py-2">

            
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-black cursor-pointer"
                  onClick={() => deleteExpense(_id)}
                  >
                  {/* dust bin icon */}
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  </td>
                </tr>

          );
        })}
        </tbody>
        </table>

      </div>
      </div>
    
  );
};