import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    return (
    <div className="register"> 
        <RegisterFunction/>
    </div>
    );
}

const RegisterFunction = () =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Initialising the state for Registration Successful Popup
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:5002/main/register", {
            username, 
            password,
            });
            setShowModal(true); // change the state of the pop up to display
            alert("Registration completed! Now you have to login")
        }catch(err){
            alert("User already exist");
        }
    };

    return(
    <div>
            <Form
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onSubmit={onSubmit}
            />
            {/* Only shows Modal Pop-up once conditions are met */}
            {showModal && (
                <RegisteredPopup
                    setShowModal={setShowModal}
                    navigateToLogin={() => navigate("/login")} // Pass navigate function
                />
            )}
    </div>
    );
};


const Form =({username, setUsername, password, setPassword, onSubmit}) => 
{
    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <p className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-black">
                        REGISTER
                    </p>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit ={onSubmit}>
                        <div>
                            <label htmlFor="username" className = "block text-md font-bold leading-6 text-gray-900">Username:</label>
                            <div className="form-group">
                                <input 
                                type="text" 
                                id="username" 
                                value={username}
                                onChange={(event) =>setUsername(event.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className = "block text-md font-bold leading-6 text-gray-900">Password:</label>
                            <div className="mt-2">
                                <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(event) =>setPassword(event.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div className = "mt-6">
                            <button 
                            type="submit" 
                            className = "flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" > 
                                Register 
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    );
};

/** Modal Popup showing Successful Registration */
const RegisteredPopup = ({setShowModal, navigateToLogin}) => {
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*Login Successfull Message*/}
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            You have successful registered for an account!
                        </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    navigateToLogin(); // Call the navigation function
                                }}
                            >
                                Continue to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}