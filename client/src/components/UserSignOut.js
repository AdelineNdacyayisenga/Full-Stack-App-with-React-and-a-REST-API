import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useEffect } from "react";

const UserSignOut = () => {
    const { actions } = useContext(UserContext);
    useEffect( () => actions.signOut()); //call the sign out method in UserContext
    return <Navigate to="/" replace />
}

export default UserSignOut;