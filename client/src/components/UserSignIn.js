import UserContext from '../context/UserContext';
import { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

/**
 * A user sign in form. User needs email and password
 * If the user doesn't have an account, there is a sign up link
 * @returns User sign in form
 */
const UserSignIn = () => {
    const { actions } = useContext(UserContext);

    //state
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const location = useLocation();

    const navigate = useNavigate();

    //event handlers 

    const handleSubmit = async (event) => {
        event.preventDefault();

        let from = '/'; //default previous path
        if (location.state) {
            from = location.state.from; //the path the user was requesting before being asked to sign in
        }

        const credentials = { //user credentials
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }
        try {
            const user = await actions.signIn(credentials); //using the Context actions sign method to sign in the user

            if (user) {
                navigate(from); //redirect the user to the page they requested 
            } else {
                setErrors(["Sign in was unsuccessful"]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }
    return (

        <div className="form--centered">
            <h2><strong>Sign In</strong></h2>
            <br />
            <div>
                <ErrorsDisplay errors={errors}/>
                <form onSubmit={handleSubmit}>
                    <label >Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                    <label >Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
            <br />
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
    );
}

export default UserSignIn;