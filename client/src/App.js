import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';

function App() {

  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="signup" element={<UserSignUp />} />
          <Route path="signin" element={<UserSignIn />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/*" element={<NotFound />} />;
        </Routes>
      </div>
  );
}

export default App;

/**
 * const coursesEndPoint = "http://localhost:5000/api/courses";
 * const [courses, setCourses] = useState([]); //to keep track of the courses

  useEffect( () => {
    function fetchCourses() {
      try {
        fetch(coursesEndPoint)
        .then(res => res.json())
        .then(data => setCourses(data));
      } catch(error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []);
  //console.log(courses); //array of courses

  const courseTitles = [];
  for(let i = 0; i < courses.length; i ++) {
    courseTitles.push(
      <div>{courses[i].title}</div>
    );
  }
 */