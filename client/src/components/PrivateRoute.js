import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);

    const location = useLocation();
    console.log(location);

    console.log(authUser);
    if(authUser) {
        return <Outlet />
    } else {
        //the state property will help us to keep track of the path the user was requesting
        return <Navigate to="/signin" state={{from: location.pathname}} />
    }
}
export default PrivateRoute;