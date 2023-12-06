import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import UserContext from "../context/UserContext";
import { apiHelper } from '../utilities/apiHelper';
import ErrorsDisplay from "./ErrorsDisplay";

/**
 * A component rendering a form to allow a user to update one of their existing courses 
 */
const UpdateCourse = () => {

    //State (initial values for the course required fields)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [courseMaker, setCourseMaker] = useState({});

    const { authUser } = useContext(UserContext); //Getting the logged in user information

    const { id } = useParams(); // course id from the browser
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    //Get current course value
    
    useEffect( () => {
        //Fetch the course with the provided id
        const fetchCourse = async () => {
            const response = await apiHelper(`/courses/${id}`, "GET");
    
            if (response.status === 200) {
                const currentCourse = await response.json();
                setCourseMaker(currentCourse.courseMaker); //Owner of the current course to be updated

                //if the user isn't the course owner, deny them access to the update page
                if(authUser.id !== courseMaker.id) { 
                    navigate('/forbidden');
                } else {
                    setTitle(currentCourse.title);
                    setDescription(currentCourse.description);
                    setMaterialsNeeded(currentCourse.materialsNeeded);
                    setEstimatedTime(currentCourse.estimatedTime);
                }    
            } else if (response.status === 403) {//unauthorized
                navigate('/forbidden');
            } else if (response.status === 404) { //if a user tries to update a nonexisting course
                navigate('/notfound');
            } else if (response.status === 401) {
                return null;
            } else {
                throw new Error();
            }
        }
        fetchCourse();
    }, [id, navigate, authUser.id, courseMaker.id]);

    //When the user submits the form to update the course
    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentCourse = {
            title: title,
            description,
            estimatedTime,
            materialsNeeded
        }
        try {
            const response = await apiHelper(`/courses/${id}`, "PUT", currentCourse, authUser); //update the course in the server

            if (response.status === 204) {//if updated
                console.log("Course successfully updated!");
                navigate(`/courses/${id}`);
            } else if (response.status === 403) {//unauthorized user
                navigate('/forbidden');
            } else if (response.status === 400) { //user not providing the required fields
                const data = await response.json();
                setErrors(data.errors);
            } else if (response.status === 500) { //server error
                navigate("/error");
            } else {//any other error
                navigate("/notfound");
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Event handler for the cancel button
    const handleCancel = (event) => { 
        event.preventDefault();
        navigate('/');
    }
    
    //Update form; initially, the form has the course's previous value until the user updates the fields
    //If user submits the form with no title and description, validation errors are displayed
    
    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label >Course Title
                        <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={e => setTitle(e.target.value)}  />
                        </label>

                        <p>By {courseMaker.firstName} {courseMaker.lastName}</p>

                        <label >Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text"
                        value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}  />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded"
                        value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateCourse;
