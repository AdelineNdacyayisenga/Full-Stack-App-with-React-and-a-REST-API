import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from 'react';
import UserContext from "../context/UserContext";
import { apiHelper } from '../utilities/apiHelper';

const UpdateCourse = () => {
    const [prevTitle, setPrevTitle] = useState("");
    const [prevDescription, setPrevDescription] = useState("");
    const [prevMaterialsNeeded, setPrevMaterialsNeeded] = useState("");
    const [prevEstimatedTime, setPreviousEstimatedTime] = useState("");

    const { authUser } = useContext(UserContext);
    const { id } = useParams();

    //Get current course value

    const fetchCourse = async () => {
        const response = await apiHelper(`/courses/${id}`, "GET");

        if (response.status === 200) {
            const currentCourse = await response.json();
            setPrevTitle(currentCourse.title);
            setPrevDescription(currentCourse.description);
            setPrevMaterialsNeeded(currentCourse.materialsNeeded);
            setPreviousEstimatedTime(setPreviousEstimatedTime);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }
    fetchCourse();
    

    const [course, setCourse] = useState();

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const courseMaker = authUser;
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        const course = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: courseMaker.id
            //courseMaker: courseMaker.current.value
        }

        try {
            const response = await apiHelper(`/courses/${id}`, "PUT", course, authUser);
            console.log(response); //then I would get the data by calling response.json()


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
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" ref={title} value={prevTitle} onChange={title} />

                        <p>By {courseMaker.firstName} {courseMaker.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateCourse;