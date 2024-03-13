/** this function gets the current user ID stored in userID from the local storage
 * the initialisation can be found in backend/login.js
*/
export const useGetUserID = () => {
    return window.localStorage.getItem("userID");
};