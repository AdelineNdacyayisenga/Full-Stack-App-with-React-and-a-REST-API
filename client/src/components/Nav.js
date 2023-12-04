import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul className="header--signedout">
                <li><Link to="signup">Sign Up</Link></li>
                <li><Link to="signin">Sign In</Link></li>
            </ul>
        </nav>

    );
}

export default Nav;