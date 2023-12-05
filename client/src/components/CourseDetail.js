import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiHelper } from '../utilities/apiHelper';
import ReactMarkDown from 'react-markdown';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({}); //to keep track of the courses
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);

    //console.log(authUser);
    //console.log(course);

    const handleDelete = async () => {

        try {
            const response = await apiHelper(`/courses/${id}`, "DELETE", null, authUser);

            if (response.status === 204) {
                console.log('Course is deleted');
                navigate('/');
            } else if (response.status === 403) {
                navigate('/forbidden');
            } else if (response.status === 500) {
                navigate('/error');
            } else {
                throw new Error();
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiHelper(`/courses/${id}`, "GET");

                if (response.status === 200) {
                    const course = await response.json();
                    setCourse(course);
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
    }, [id, navigate]);

    if (isLoaded) {
        console.log(isLoaded)
        return (
            <>
                <div className="actions--bar">
                    <div className="wrap">
                        <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                        <button className="button" onClick={handleDelete}>Delete Course</button>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>

                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>By {course.courseMaker.firstName} {course.courseMaker.lastName}</p>
                                <ReactMarkDown children={course.description} />

                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkDown children={course.materialsNeeded} />
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default CourseDetail;

/* 
Only show the delete and update buttons if the authenticated user's id matches the course maker id
{
    authUser.id === course.userId ?
        <>
            <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
            <button className="button" onClick={handleDelete}>Delete Course</button>
        </> : null
}


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

    
    return (
            <>
                {
                    authUser === null
                        ?
                        <>
                            <p>To see the course details, you have to be signed in</p>
                            <p>If you have an account sign in <Link to="/signin">here</Link></p>
                            <p>If you don't have an account, please sign up <Link to="/signup">here</Link></p>
                        </>
                        :
                        <>
                            <div className="actions--bar">
                                <div className="wrap">
                                    <Link className="button" to="update-course.html">Update Course</Link>
                                    <Link className="button" to="#">Delete Course</Link>
                                    <Link className="button button-secondary" to="/">Return to List</Link>
                                </div>
                            </div>

                            <div className="wrap">
                                <h2>Course Detail</h2>
                                <form>
                                    <div className="main--flex">
                                        <div>
                                            <h3 className="course--detail--title">Course</h3>
                                            <h4 className="course--name">{course.title}</h4>
                                            <p>{course.courseMaker.firstName} {course.courseMaker.lastName}</p>

                                            <p>{course.description}</p>
                                        </div>
                                        <div>
                                            <h3 className="course--detail--title">Estimated Time</h3>
                                            <p>{course.estimatedTime}</p>

                                            <h3 className="course--detail--title">Materials Needed</h3>
                                            <ul className="course--detail--list">
                                                <ReactMarkDown children={course.materialsNeeded} />
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                }
            </>

        );
*/