import axios from "axios";
import { useGetUserID } from "../components/getUserId";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";

const BudgetForm = () => {
  
  const userID = useGetUserID();

  // Define a state variable to hold the budget data
  const [budgetNum, setBudget] = useState(null);

  const [budgetData, setBudgetData] = useState({
    id: userID,
    budget: "",
  });

  const {totalExpense} = useGlobalContext();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const [cookies] = useCookies(["access_token"]);

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevents the page from auto-refreshing before submitting the form

    try {
      await axios.post(
        "http://localhost:5002/auth/budget", //sends a POST request to the route 
        { ...budgetData },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Budget Created");

      // After successful submission, update the budget state
      setBudget(budgetData.budget);
    
    //handles errors  
    } catch (error) {
      console.error(error); 
    }
  };

  useEffect(() => {
    // Fetch the budget data when the component mounts
    async function fetchBudget() {
      try {
        const response = await axios.get(
          `http://localhost:5002/auth/get-budget/${userID}` //sends a GET request to retrieve budget data by userID
        );
        // Update the budget state with the retrieved data
        setBudget(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    fetchBudget(); // Call the function to fetch the budget
  }, [userID]); // Include userID as a dependency to trigger the fetch when it changes


const actualTotalExpense = totalExpense(); //calls the totalExpense function 

    
 const calculatePercentageLeft = () => {
      //ensures that calculation is done only if both the budget and total expense are numbers 
    if (budgetNum === null || totalExpense === null) {
      return "Loading...";
    }

    
    const remainingBudget = budgetNum - actualTotalExpense; //calculates the budget left based on the total expenses
    
    if (remainingBudget < 0) {
      return "You have no budget left!"; //sets the conditions for when users have oversepnt their budget 
    }

    const percentageLeft = (remainingBudget / budgetNum) * 100; //converts the remaining budget into a percentage 

    return `${percentageLeft.toFixed(2)}%`; //fixes the percentage to 2 decimal places 
  }


  useEffect(() =>{
    calculatePercentageLeft();
  },[actualTotalExpense,budgetNum]);

    

  return (
    <form onSubmit={handleSubmit}>
       <p>Enter your budget to caculate the percentage of budget left</p>
      <div boarder>
        {/* box to input budget amount */}
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={budgetData.budget}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-700 mt-3"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {/* displays the budget amount */}
      <p>Your Budget: {budgetNum !== null ? budgetNum: "Loading..."}</p>
      {/* shows the calculated percentage of budget left */}
      <p>Percentage of Budget Left: {calculatePercentageLeft()}</p>
    </form>
  );
};

export default BudgetForm;
