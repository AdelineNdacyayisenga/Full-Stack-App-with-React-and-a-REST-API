import { useEffect, useState } from 'react';
import { apiHelper } from '../utilities/apiHelper';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiHelper(`/courses`, "GET");
                const courses = await response.json();
                setCourses(courses);

            } catch (error) {
                console.log(error);
            }

        }
        fetchCourses();
    }, []);

    return (
        <div className="wrap main--grid">
            {
                courses.map(course => (
                    <NavLink to={`/courses/:${course.id}`} className="course--module course--link">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </NavLink>
                ))
            }
            
            <a className="course--module course--add--module" href="create-course.html">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );
}
export default Home;

/* 

*/