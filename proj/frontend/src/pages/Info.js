import "bootstrap/dist/css/bootstrap.min.css";

//Start of html portion

export const Info = () => {
    
    return(
        <div className="bg-gray-100 border-2 border-white shadow-md p-4 rounded-lg flex items-center">
            <div class ="card-body">
            <h1 class="display-5">Informations</h1>

            <h2 class="display-6"><u>Home Page</u></h2>
            <li>Income: The amount you earn every month</li>
            <li>Expenses: The amount you spent every month.</li>
            <li>Balance: Income minus expenses</li>
            <li>Recent transactions: Displays out your recent expenses via categories, dates and the amount you spent</li>
            <li>Cost of living: Select a country to view their cost of living. Using the country you selected as a comparison, it compares your balance remaining to the average cost of living.</li>
            <br></br>
            <h2 class="display-6"><u>Income and Expense Page</u></h2>
            <li>Click insert to enter your records</li>
            <li>Click delete to delete the records.</li>
            <li>Insert your budget to caculate the percentage of spending</li>
          
          
            </div>

    
</div>
    
    );
}

//End of html portion