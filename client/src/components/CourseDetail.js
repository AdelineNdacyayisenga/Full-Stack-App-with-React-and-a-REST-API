import { useContext } from 'react';
import CourseContext from '../context/CourseContext';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
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
        <h1>Course Detail</h1>
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
*/