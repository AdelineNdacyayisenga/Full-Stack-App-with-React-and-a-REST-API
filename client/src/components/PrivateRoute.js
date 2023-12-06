import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * Configures the protected routes (routes that require authentication)
 */
const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);

    const location = useLocation();
    
    if(authUser) {
        return <Outlet />
    } else {
        //the state property will help us to keep track of the path the user was requesting before being redirected to sign in
        return <Navigate to="/signin" state={{from: location.pathname}} />
    }
}
export default PrivateRoute;