import UserContext from '../context/UserContext';
import { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

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

        let from = '/';
        if (location.state) {
            from = location.state.from; 
            console.log(from)
        }

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }
        try {
            const user = await actions.signIn(credentials);

            if (user) {
                
                navigate(from); //redirect the user to the page the requested 
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