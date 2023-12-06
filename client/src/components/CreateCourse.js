import { useRef, useState, useContext } from 'react';
import { apiHelper } from '../utilities/apiHelper';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const CreateCourse = () => {

    const { authUser } = useContext(UserContext);

    //state
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const courseMaker = authUser;
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    //event handlers and helper functions

    const handleSubmit = async (event) => {
        event.preventDefault();

        //create the course
        const course = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: courseMaker.id
            
        }

        //add course to the server
        try {
            const response = await apiHelper('/courses', "POST", course, authUser);

            if (response.status === 201) {
                console.log(`A course titled ${course.title} is successfully created!`);
                navigate('/');
            } else if (response.status === 400) { //if required values are missing
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }

        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (

        <div className="wrap">
            <h2>Create Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label >Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                        <p>By {courseMaker.firstName} {courseMaker.lastName}</p>
                        
                        <label >Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                    </div>
                    <div>
                        <label >Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>

    );
}

export default CreateCourse;
