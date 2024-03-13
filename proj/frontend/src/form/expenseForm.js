import axios from "axios";
import { useGetUserID } from "../components/getUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";


const ExpenseForm = () => {

    const userID = useGetUserID();
    const [cookies] = useCookies(["access_token"]);

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  //handles changes to the input fields as users type in their expense details 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5002/auth/add-expense", //sends data to backend API when users submit their expenses
        { ...expense },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("expense Created"); // text pop-up when an expense is added successfully 
      navigate("/expense");
      console.log("test" + userID);

      // Reset the input fields after successful submission
      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
        userOwner: userID,
      });
      //Refreshes the page to update the budget section
      
      window.location.reload(false);

    } catch (error) {
      console.error(error);
    }
  };

    
      return (
        <div className="container mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Enter Your Expense Details</h2>
        <form onSubmit={handleSubmit}>
          {/* start of input box for date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
            {/* end of input box for date */}
       
          {/* start of input box for amount of expense */}
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Enter the amount"
            />
          </div>
          {/* end of input box for amount of expense */}

          {/* start of input box for category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-900">Category:</label>
            <select
              id="category"
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="border border-gray-700 p-2 rounded w-f"
              placeholder="Enter the category"
              >   
            <option value=""  disabled >Select Option</option>
            <option value="Rent">Rent</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Subscription">Subscription</option> 
            <option value="Medical">Medical</option>  
            <option value="Education">Education</option>   
            <option value="Others">Others</option>      
            </select>
          </div>
          {/* end of input box for category */}
         
         {/* start of input box for expense title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={expense.title}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Enter the title"
            />
          {/* end of input box for expense title */}

          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onClick={handleSubmit}>
          Add Expense</button>
          
        </form>
      </div>


    );
};

export default ExpenseForm