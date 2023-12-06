import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiHelper } from '../utilities/apiHelper';
import ReactMarkDown from 'react-markdown';

/**
 * A component that retrieves the detail for a course from the REST API's /api/courses/:id
 * 
 * If the logged in user is the course owner, update and delete buttons are displayed to allow them to make changes
 * 
 * @returns a form with a course's details
 */
const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({}); //to keep track of the courses
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);

    const handleDelete = async () => {
        try {
            const response = await apiHelper(`/courses/${id}`, "DELETE", null, authUser); //Can only delete if you are an authorized user

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
        //Fetch the course information
        const fetchCourse = async () => {
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
        fetchCourse();
    }, [id, navigate]);

    if (isLoaded) {
        //Only display the delete and update buttons if there is a user logged in and the logged in user id is the course maker's id
        //Only the course owner can make changes to a course; everyone else can only view the course details
        return (
            <>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            authUser && authUser.id === course.userId ?
                                <>
                                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                    <button className="button" onClick={handleDelete}>Delete Course</button>
                                </> : null
                        }
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
