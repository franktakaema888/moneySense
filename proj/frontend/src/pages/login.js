import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
    return (
        <div className="login"> 
            {/* Login Page Functions */}
            <LoginFunction/>
            <RegisterPage/>
        </div>
    );
}


const LoginFunction = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Initialising the state for Login Error Popup
    const [showModal, setShowModal] = useState(false);

    const [ _ , setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate()

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:5002/main/login", {
                username, 
                password,
            });
            //Condition to check if user entered the correct login details
            //only when login details are correct, execute the following condition
            if(response.data.userID){ //Valid details entered
                //initialise cookies and save user input to local storage under index "userId"
                setCookies("access_token", response.data.token);
                // store username id of current user that is logged in
                window.localStorage.setItem("userID", response.data.userID);
                //store username for navBar of current user
                window.localStorage.setItem("username", username); 
                navigate("/home");
            } else { //Invalid details entered
                setShowModal(true); //Changing the state of Login Error to show pop up

                navigate("/login");
            }

        }catch(err){
            console.error(err);
        }
    };

    return(
        <div className="login-function">
            <Form
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onSubmit={onSubmit}
            />
            {/* Only shows Modal Pop-up once conditions are met */}
            {showModal && <LoginErrorPopup setShowModal={setShowModal} />} {/* Conditionally render the modal */}
        </div>
    );
};

/** Login input form to register user input  */
const Form =({username, setUsername, password, setPassword, onSubmit}) => 
{
    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {/* Page Name */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <p className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-cyan-500">
                    Expense Tracker
                </p>
            </div>
            {/* Text to sign in to your account */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign In to your account
                </p>
            </div>
            {/* Text Boxes to enter your login details */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit ={onSubmit} >
                    <div>
                        <label 
                        htmlFor="username"
                        className= "block text-sm font-bold leading-6 text-gray-900">
                            Username:
                        </label>
                        <div className="mt-2">
                            <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(event) =>setUsername(event.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>   
                        <label 
                        htmlFor="password"
                        className="block text-sm font-bold leading-6 text-gray-900">
                            Password:
                        </label>
                        <div className="mt-2">
                            
                            <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(event) =>setPassword(event.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div> 
                    </div>
                    {/* Login Button */}
                    <div>
                        <button type="submit" className = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
                            Login 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
/** Link to redirect Registration Page */
const RegisterPage = () => {
    return(
        <div >
            {/* Text Below with link to the Registration Page */}
            <p className= "text-sm"> 
                No Account? Go to
                <Link to="/register" className = "ml-1 text-sm text-blue-600 hover:text-blue-400"> 
                        Sign up
                </Link> 
            </p>      
        </div>
    );
}

/** Modal Popup showing invalid login */
const LoginErrorPopup = ({setShowModal}) => {
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*Error Message*/}
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            You have entered an Invalid Username or Password
                        </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}