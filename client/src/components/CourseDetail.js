import { useContext, useEffect, useState } from 'react';
import CourseContext from '../context/CourseContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiHelper } from '../utilities/apiHelper';
import Header from './Header';

const CourseDetail = () => {
    const { id } = useParams();
    const courseId = parseInt(id.substring(1,));
    const [course, setCourse] = useState({}); //to keep track of the courses
    const navigate = useNavigate();

    // const handleDelete = () => {

    // }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiHelper(`/courses/${courseId}`, "GET");

                if (response.status === 200) {
                    const course = await response.json();
                    setCourse(course);
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
    }, [courseId, navigate]);

    console.log(course);

    return (
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to="update-course.html">Update Course</Link>
                    <Link className="button" to="#">Delete Course</Link>
                    <Link className="button button-secondary" to="index.html">Return to List</Link>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{`${course.title}`}</h4>
                            <p>{`${course.courseMaker.firstName} ${course.courseMaker.lastName}`}</p>

                            <p>{`${course.description}`}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>`${course.estimatedTime}`</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {`${course.materialsNeeded}`}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CourseDetail;

/* 
const courseDetailEndPoint = `http://localhost:5000/api/courses/:${course.id}`;
    const [courseDetail, setCourseDetail] = useState([]); //to keep track of the courses

    useEffect(() => {
        function fetchCourses() {
            try {
                fetch(courseDetailEndPoint)
                    .then(res => res.json())
                    .then(data => setCourseDetail(data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses();
    }, [courseDetailEndPoint]);

    console.log(courseDetail);

    const { id } = useParams();
    const { title } = useContext(CourseContext);
    const { description } = useContext(CourseContext);
    const { materialsNeeded } = useContext(CourseContext);
    const { courseMaker } = useContext(CourseContext);
    const { estimatedTime } = useContext(CourseContext);

    console.log(id);
    console.log(title);
    console.log(description);
*/