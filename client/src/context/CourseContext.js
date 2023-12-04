import { createContext, useState, useEffect } from 'react';

const CourseContext = createContext(null);

export const CourseProvider = (props) => {
    const [courses, setCourses] = useState(null);
    const [courseMaker, setCourseMaker] = useState(null);
    const [description, setDescription] = useState(null);
    const [materialsNeeded, setMaterialsNeeded] = useState(null);
    const [title, setTitle] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);

    //fetch course
    const coursesEndPoint = "http://localhost:5000/api/courses"; 

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

    return (
        <CourseContext.Provider value={
            {
                courseMaker,
                description,
                materialsNeeded,
                title,
                estimatedTime,
                actions: {
                    updateCourseMaker: setCourseMaker,
                    updateDescription: setDescription,
                    updateMaterialsNeeded: setMaterialsNeeded,
                    updateTitle: setTitle,
                    updateEstimatedTime: setEstimatedTime
                }
            }
        }>
            {props.children}
        </CourseContext.Provider>
    );
     
}

export default CourseContext;