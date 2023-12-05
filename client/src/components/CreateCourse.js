import { useRef, useState, useContext } from 'react';
import { apiHelper } from '../utilities/apiHelper';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

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
            //courseMaker: courseMaker.current.value
        }

        //add course to the server
        try {
            
            const response = await apiHelper('/courses', "POST", course, authUser);
            console.log(response);
            
        } catch(error) {
            console.log(error);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        
        <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label >Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                            <p>By {courseMaker.firstName} {courseMaker.lastName}</p>
                            <br />
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