import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

/**
 * The navigation component; for user sign in, sign up, sign out links
 * If user is signed in, a welcome message and a sign out link are displayed. Otherwise, there is an option to sign in or sign up
 */
const Nav = () => {
    const { authUser } = useContext(UserContext);

    return (
        <nav>
            {authUser === null
                ?
                <ul className="header--signedout">
                    <li><Link to="signup">Sign Up</Link></li>
                    <li><Link to="signin">Sign In</Link></li>
                </ul>
                :
                <>
                    <ul className="header--signedin">
                        <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
                        <li><Link to="/signout">Sign Out</Link></li>
                    </ul>
                </>
            }
        </nav>
    );
}

export default Nav;