import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import UserContext from "../context/UserContext";
import { apiHelper } from '../utilities/apiHelper';
import ErrorsDisplay from "./ErrorsDisplay";

const UpdateCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");

    const { authUser } = useContext(UserContext);
    const { id } = useParams();

    //Get current course value
    
    useEffect( () => {
        const fetchCourse = async () => {
            const response = await apiHelper(`/courses/${id}`, "GET");
    
            if (response.status === 200) {
                const currentCourse = await response.json();
                setTitle(currentCourse.title);
                setDescription(currentCourse.description);
                setMaterialsNeeded(currentCourse.materialsNeeded);
                setEstimatedTime(currentCourse.estimatedTime);
            } else if (response.status === 401) {
                return null;
            } else {
                throw new Error();
            }
        }
        fetchCourse();
    }, [id]);

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentCourse = {
            title: title,
            description,
            estimatedTime,
            materialsNeeded
        }
        try {
            const response = await apiHelper(`/courses/${id}`, "PUT", currentCourse, authUser);
            if (response.status === 204) {
                console.log("Course successfully updated!");
                navigate(`/courses/${id}`);
            } else if (response.status === 403) {//unauthorized
                navigate('/forbidden');
            } else if (response.status === 400) { //not providing the required fields
                const data = await response.json();
                setErrors(data.errors);
            } else if (response.status === 500) {
                navigate("/error");
            } else {
                navigate("/notfound");
            }

        } catch (error) {
            console.log(error);
        }
    }
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }
    
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

                        <p>By {authUser.firstName} {authUser.lastName}</p>

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
