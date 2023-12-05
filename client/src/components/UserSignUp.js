import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { apiHelper } from '../utilities/apiHelper';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = () => {
    const {actions} = useContext(UserContext);

    const navigate = useNavigate();
    //State
    const firstName = useRef(null);
    const lastName = useRef(null);
    const password = useRef(null);
    const emailAddress = useRef(null);
    const [errors, setErrors] = useState([]);

    //event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        //create the user
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        //add new user to the server

        try {
            const response = await apiHelper('/users', "POST", user);
            console.log(response);
            if (response.status === 201) {
                console.log(`${user.firstName} is successfully signed up and authenticated`);
                await actions.signIn(user);
                navigate('/');
            } else if(response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
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
        <>
            <div className="form--centered">
                <h2><strong>Sign Up</strong></h2>
                <br />
                <div>
                    <ErrorsDisplay errors={errors} />
                    <form onSubmit={handleSubmit}>
                        <label >First Name</label>
                        <input id="firstName" name="firstName" type="text" ref={firstName} />
                        <label >Last Name</label>
                        <input id="lastName" name="lastName" type="text" ref={lastName} />
                        <label >Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress}  />
                        <label >Password</label>
                        <input id="password" name="password" type="password" ref={password}  />
                        <button className="button" type="submit">Sign Up</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <br />
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </>
    );
}

export default UserSignUp;