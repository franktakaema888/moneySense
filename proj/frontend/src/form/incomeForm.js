import axios from "axios";
import { useGetUserID } from "../components/getUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

const IncomeForm = () => {

  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);

  const [income, setIncome] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  //handles any changes in the input fields while users type in the income details 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncome({ ...income, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5002/auth/add-income", //sends the data to backend API when users click submit 
        { ...income },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Income Created"); //text pop-up when an income has been added successfully 
      navigate("/income");
      console.log("test" + userID);

      // Reset the input fields after successful submission
      setIncome({
        title: "",
        amount: "",
        category: "",
        date: "",
        userOwner: userID,
      });
      
    } catch (error) {
      console.error(error); //handles any errors
    }
  };

    
      return (
        <div className="container mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Enter Your Income Details</h2>
        <form onSubmit={handleSubmit}>
          {/* start of input box for date of income */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={income.date}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          {/* end of input box for date of income */}
          
          {/* start of input box for amount of income */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={income.amount}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Enter the amount"
            />
          </div>
          {/* end of input box for amount of income */}
          
          {/* start of input box for category of income */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-900">Category:</label>
            <select
              id="category"
              name="category"
              value={income.category}
              onChange={handleChange}
              className="border border-gray-700 p-2 rounded w-f"
              placeholder="Enter the category"
              >
            
            <option value=""  disabled >Select Option</option>
            <option value="salary">Salary</option>
            <option value="freelancing">Freelancing</option>
            <option value="investments">Investments</option>
            <option value="stocks">Stocks</option>
            <option value="bitcoin">Bitcoin</option> 
            <option value="bank">Bank Transfer</option>  
            <option value="youtube">Youtube</option>   
            <option value="other">Other</option>      
            </select>
          </div>
          {/* end of input box for category of income */}
          
          {/* start of input box for title of income */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={income.title}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Enter the title"
            />
            </div>
          {/* start of input box for title of income */}
          
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700" onClick={handleSubmit}>
          Add Income</button>
          </form>
      </div>


    );
};

export default IncomeForm