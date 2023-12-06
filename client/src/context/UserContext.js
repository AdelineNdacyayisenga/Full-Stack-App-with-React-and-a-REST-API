//Create user context to pass data deeply

import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { apiHelper } from '../utilities/apiHelper';

const UserContext = createContext(null);

/**
 * Context to manage the user global state and be able to access that in any component of our app
 * Defines the authenticated user and user sign in and sign out actions(methods)  using a Context API component and made available throughout the application using Context API Consumer components
 * 
 * The entire app (in index.js) is wrapped inside the UserProvider tags
 */

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser"); //Cookie to save the authenticated User (signed in user)

    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null); //if no one signed in, authUser is null

    //sign in method
    const signIn = async (credentials) => {

        const response = await apiHelper("/users", "GET", null, credentials);

        if (response.status === 200) {
            const user = await response.json();
            user.password = credentials.password;
            setAuthUser(user); //all credentials including user password
            Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1}); //creates the authenticatedUser cookie to keep the logged in user informatioin in case we need it anywhere else; the info expires in 1 day

            return user;
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    //sign out method
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove("authenticatedUser"); //Clear the cookie since user is signing out; won't remember the credentials
    }

    return (
        <UserContext.Provider value={
            {
                authUser: authUser,
                actions: {
                    signIn,
                    signOut
                }
            }
        }>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;