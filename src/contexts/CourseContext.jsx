/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import CourseService from '../servers/Course.service';

export const CourseContext = createContext();

function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [courseBuyed, setCourseBuyed] = useState([])

  // 取的所有課程
  const getCourseMethod = () => {
    CourseService.getCourses()
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data.courses)
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("")
        }, 1500)
      })
  }

  // 取得購買的課程判斷加入購物車按鈕的狀態
  const handleAddCourseBtn = (purshedCourses) => {
    const courseAry = []
    courseAry.push(purshedCourses)
    if (courseAry.length === 0) {
      return
    } else {
      const course_title = courseAry[0].map((item) => {
        return item.course_title
      })
      setCourseBuyed(course_title)
    }
  }

  // 轉換時間
  const format_time = (open_class_date) => {
    const dateTime = new Date(open_class_date);
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayOfWeek = daysOfWeek[dateTime.getDay()];
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const startHour = hour >= 12 ? hour - 12 : hour;
    const endHour = startHour + 1;
    const formatDateTime = `${dayOfWeek} ${startHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ~ ${endHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return formatDateTime
  }

  useEffect(() => {
    getCourseMethod();
  }, []);

  return (
    <CourseContext.Provider
      value={{ courses, setCourses, message, setMessage, getCourseMethod, format_time, handleAddCourseBtn, courseBuyed, setCourseBuyed }}>
      {children}
    </CourseContext.Provider>
  )
}

export default CourseProvider;