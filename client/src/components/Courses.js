import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Courses = () => {
    const coursesEndPoint = "http://localhost:5000/api/courses";
    const [courses, setCourses] = useState([]); //to keep track of the courses

    useEffect(() => {
        function fetchCourses() {
            try {
                fetch(coursesEndPoint)
                    .then(res => res.json())
                    .then(data => setCourses(data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses();
    }, []);
    console.log(courses); //array of courses

    return (
        <div class="wrap main--grid">
            {
                courses.map(course => (
                    <NavLink to={`/courses/:${course.id}`} className="course--module course--link">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </NavLink>
                ))
            }
            
            <a class="course--module course--add--module" href="create-course.html">
                <span class="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    );
}

export default Courses;