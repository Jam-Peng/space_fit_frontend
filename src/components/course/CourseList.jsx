/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { AiOutlineShoppingCart } from 'react-icons/ai/'
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { CourseContext } from '../../contexts/CourseContext';
import { CartContext } from '../../contexts/CartContext';
import { SiginContext } from '../../contexts/SiginContext';

function CourseList({ course, currentUser}) {
  const { addToCart } = useContext(CartContext);
  const { format_time, handleAddCourseBtn, courseBuyed, setCourseBuyed } = useContext(CourseContext)
  const { isDisabled, setIsDisabled } = useContext(SiginContext)

  const { images, title, category, teacher, description, open_class_date, price, course_id } = course;
  // 轉換時間
  const formatDateTime = format_time(open_class_date)

  useEffect(() => {
    if (!currentUser) {
      setCourseBuyed([])
      return
    } else {
      setIsDisabled(false)
      handleAddCourseBtn(currentUser.client_data.courses)
    }
  }, [currentUser, setIsDisabled])

  return (
    <section className="p-4">
      <div className="border rounded-lg bg-slate-50 overflow-hidden relative group transition hover:shadow-md md:flex flex-row ">
        <div className="w-full lg:w-3/12"> 
          <Link to={`/course/${course_id}`}>
            <div className="w-64 h-30 mx-auto md:mx-0 ">
              <img src={`data:image/png;base64,${images[0]['image_path']}`} alt={course.title}
                className="object-contain md:w-auto h-full group-hover:scale-110 transition duration-300 "/>
            </div>
          </Link>
        </div>
          
        <div className="hidden md:flex w-8/12 md:w-9/12  p-6 justify-between">
          <div className="w-5/12 lg:w-8/12 flex flex-col space-y-1">
            <span className="text-2xl font-medium text-slate-800 pb-5">{ title }</span>
            <div>
              <span className="text-gray-500">{category} | {teacher} | { formatDateTime }</span>
            </div>
            <span className="text-gray-500 truncate">{ description }</span>  
          </div>
        
          <div className="flex flex-col justify-between pr-20 lg:pr-10 ">
            <span className="text-2xl text-gray-600"> $ {price}</span>
            <div>
              {courseBuyed.includes(title) ?
                <div className="border rounded-lg px-3.5 flex items-center space-x-2 py-1.5
                  bg-indigo-500 text-slate-50 text-base">
                  <FiCheckCircle size={21}/>
                  <span className='cursor-default'>課程已購買</span>
                </div>
              :
              <button className="add-car space-x-2" disabled={isDisabled}
                onClick={() => { addToCart(course, course_id) }}>
                <AiOutlineShoppingCart size={25}/>
                {currentUser ?
                <span>加入購物車</span>
                :
                <span>請先登入</span> 
                }
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseList;