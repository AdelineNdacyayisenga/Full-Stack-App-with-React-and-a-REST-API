import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { apiHelper } from '../utilities/apiHelper';

const Courses = () => {
    const [courses, setCourses] = useState([]); //to keep track of the courses
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiHelper("/courses", "GET");

                if (response.status === 200) {
                    const course = await response.json();
                    setCourses(course);
                    setIsLoaded(true);
                } else if (response.status === 404) {
                    navigate('/notfound');
                } else {
                    navigate('/error');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses();
    }, [navigate]);

    if (isLoaded) {
        return (
            <div className="wrap main--grid">
                {
                    courses.map(course => (
                        <NavLink to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </NavLink>
                    ))
                }
                
                <Link className="course--module course--add--module" to="courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        );
    }  
}

export default Courses;