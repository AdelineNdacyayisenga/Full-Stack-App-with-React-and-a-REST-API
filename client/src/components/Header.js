
import { Link } from 'react-router-dom';
import Nav from './Nav';

/**
 * Main Header; links to the courses list
 */
const Header = () => {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Course</Link></h1>  
                <Nav />
            </div>
        </header>

    );
}

export default Header;