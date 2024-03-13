import { useState, useEffect } from "react"
import { useGetUserID } from "../components/getUserId";
import axios from 'axios'



const URL = "http://localhost:5002/auth/";

// const GlobalContext = createContext(null);

export const useGlobalContext = () => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    //const [budgets, setBudget] = useState ([])
    const [error, setError] = useState(null)

    //fetching the ID of current user that is logged in
	let userId = useGetUserID();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [userId]); 

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${URL}get-incomes`)
            const userIncomes = response.data.filter(income => income.userOwner === userId);
            setIncomes(userIncomes);
            
        } catch (error) {
            setError(error.message);
        }
    }


    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            if(income.userOwner === userId)
            {
                totalIncome += income.amount

            }
        })

        return totalIncome;
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${URL}get-expenses`)
            const userExpenses = response.data.filter(expense => expense.userOwner === userId);
            setExpenses(userExpenses);
            
            
        } catch (error) {
            setError(error.message);
        }
    }

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            if(expense.userOwner === userId)
            {
                totalExpense += expense.amount
            }
        })

        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const sortedRecentExpenses = () => {
        const recentExpenses = [...expenses];
        recentExpenses.sort((c, d) => {
            return new Date(c.createdAt) - new Date(d.createdAt)
        })

        return recentExpenses;

    }

    const sortedRecentIncomes = () => {
        const recentIncomes = [...incomes];
        recentIncomes.sort((c, d) => {
            return new Date(c.createdAt) - new Date(d.createdAt)
        })

        return recentIncomes;

    }

    


    const contextValue = {
        getIncomes,
        incomes,
        expenses,
        totalIncome,
        getExpenses,
        totalExpense,
        totalBalance,
        transactionHistory,
        sortedRecentExpenses,
        sortedRecentIncomes,
        error,
        setError
    };

    return (
        contextValue
    )
}