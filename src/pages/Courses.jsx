/* eslint-disable react/prop-types */
import { useContext } from "react";
import CourseList from "../components/course/CourseList";
import { CourseContext } from "../contexts/CourseContext";

function Courses({currentUser}) {
  const { courses } = useContext(CourseContext);
  
  return (
    <section className="container mx-auto">
      <div className="py-16 px-0 lg:px-16">
        <div className="grid grid-cols-1 space-y-4"> 
          {courses.map(course => {
            return (
              <CourseList key={course.id} course={course} currentUser={currentUser} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Courses;
