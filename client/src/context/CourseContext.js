import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { apiHelper } from '../utilities/apiHelper';

const CourseContext = createContext(null);

export const CourseProvider = (props) => {
    const cookie = Cookies.get("currentCourse");



    return (
        ()
    );
     
}

export default CourseContext;