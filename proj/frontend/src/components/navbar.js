import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

/** Navigation bar is located at the top of the page
 * - The links within the bar will vary based on wether the user is logged in or not.
 * 
 */
export const Navbar =() =>{

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    // get the string of the current user that is logged in
    let username = window.localStorage.getItem("username");

    const logout = () =>{
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("username");
        alert("user logout"); 
        console.log("logout button clicked");
        navigate("/");
    }
    //Navbar when user is logged out
    const LoggedOut = () => {
        return(
            <nav className="bg-gray-800"> 
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start items-stretch "> 
                            {/* Dollar Icon */}
                            <Link to="/" className="text-white rounded-md px-3 py-2 text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>
                            {!cookies.access_token ?( 
                            <Link to="/" className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"> 
                                Login 
                            </Link> 
                            ) : (
                                <button 
                                onClick={logout} 
                                className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    Logout
                                </button>
                            )} 
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link to="/info" className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"> 
                                {/* Question Mark Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                            </Link> 
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    //Navbar displayed when user is logged in
    const LoggedIn = () => {
        return(
            <nav className="bg-gray-800"> 
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start items-stretch ">
                            {/* Dollar Icon */}
                            <Link to="/home" className="text-white rounded-md px-3 py-2 text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>
                            <Link to="/home" className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"> 
                                Home 
                            </Link>  
                            <Link to="/income" className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"> 
                                Income 
                            </Link>  
                            <Link to="/expense" className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"> 
                                Expenses 
                            </Link>  
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link to="/info" className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"> 
                                {/* Question Mark Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                            </Link> 
                            {/* Displays the current user that is logged in */}
                            <h2 className = "text-white px-3 py-2 text-sm font-medium">
                                {username}
                            </h2>
                            {!cookies.access_token ?( 
                            <Link to="/"> Login </Link> 
                            ) : (
                                <button 
                                onClick={logout}
                                className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-small">
                                    Logout
                                </button>
                            )} 
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    //Condition to check if the user is logged in or not
    //Navbar displays will adjust accordingly based on the conditions
    
    const isUserNotLoggedIn = !window.localStorage.getItem("userID");

    if(isUserNotLoggedIn){
        console.log("not logging in");
        return(
            <LoggedOut/>
        )
    }
    if(!isUserNotLoggedIn) {
        console.log("logging in");
        return(
            <LoggedIn/>
        )
    }
}


