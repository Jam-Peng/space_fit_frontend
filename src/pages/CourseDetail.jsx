/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import '../styles/css/course_detail.css'
import { AiOutlineShoppingCart } from 'react-icons/ai/'
import { FaFacebookSquare, FaInstagramSquare, FaLine } from 'react-icons/fa/'
import { FiCheckCircle } from 'react-icons/fi';
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { CourseContext } from "../contexts/CourseContext";
import { CartContext } from '../contexts/CartContext';
import { SiginContext } from '../contexts/SiginContext';

function CourseDetail({ currentUser }) {
  const { addToCart } = useContext(CartContext);
  const { courses, getCourseMethod, format_time, handleAddCourseBtn, courseBuyed, setCourseBuyed } = useContext(CourseContext);
  const { isDisabled, setIsDisabled } = useContext(SiginContext);
  const { id } = useParams();

  useEffect(() => {
    getCourseMethod()
  }, [getCourseMethod])  

  useEffect(() => {
    if (!currentUser) {
      setCourseBuyed([])
      return
    } else {
      setIsDisabled(false)
      handleAddCourseBtn(currentUser.client_data.courses)
    }
  }, [currentUser, setIsDisabled])
  
  const selectCourse = courses.find(item => item.course_id === id);
  const { images, title, category, teacher, description, open_class_date, price, class_amount } = selectCourse;
  // 轉換時間
  const formatDateTime = format_time(open_class_date)

  return (
    <>
        {/* <section className="h-screen flex justify-center items-center">
          Loading...
        </section> */}
        
      <section className="h-screen py-14 mb-28 ">
        <div className="flex justify-center items-center mt-2">
          <div className="detail_background h-full flex items-center px-40">
            <div className='text-slate-50'>
              <div className='flex flex-col space-y-4'>
                <span className='text-[2rem]'>{title}</span>
                <div className='flex flex-col space-y-1 text-[1.1rem]'>
                  <span>教練：{ teacher }</span>
                  <span>時間：{ formatDateTime }</span>
                  <div className='space-x-5'> 
                    <span>開班人數：{ class_amount }</span>
                    <span>報名人數：{ class_amount }</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-28">
          <div className='p-4 space-x-4 flex'>
            <div className='w-8/12 p-4 space-y-8'>
              <div className='space-y-2 border rounded-lg p-4 bg-slate-50'>
                <span className='text-[1.3rem] font-medium text-slate-800'>課程介紹</span>
                <div className='w-10/12'>
                  <span className='text-base text-gray-500'>{description}</span>
                </div>
              </div>
              <div className='w-full lg:w-10/12 '> 
                <div className='w-8/12 h-full mx-auto md:mx-0 border rounded-lg overflow-hidden'>
                    <img src={`data:image/png;base64,${images[0]['image_path']}`} alt=""
                      className='object-contain md:w-auto h-full' />
                </div>
              </div>
            </div>
  
            <div className=' w-4/12 p-4 space-y-8'>
              {/* 購物車 */}
              <div className='border rounded-lg space-y-4 p-4 bg-slate-50'>
                <div className='flex items-center justify-between'>
                  <div className='border rounded-lg w-4/12 text-center bg-indigo-500'>
                    <span className='text-slate-50 text-base'>{ category }</span>
                  </div>
                  <span className='text-2xl text-gray-600'>$ { price }</span>
                </div>
                <div>
                  {courseBuyed.includes(title) ?
                    <div className="border rounded-lg px-3.5 flex items-center justify-center space-x-2 py-1.5
                    bg-indigo-500 text-slate-50 text-base">
                      <FiCheckCircle size={21}/>
                      <span className='cursor-default'>課程已購買</span>
                    </div>
                  :
                    <button
                      onClick={()=>{addToCart(selectCourse, selectCourse.course_id)}}
                      className="add-car space-x-2" disabled={isDisabled} >
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

              <div className='border rounded-lg space-y-2 p-4 bg-slate-50 flex flex-col items-center'>
                <div className='text-[1.2rem]'>
                  <span>關於 { teacher } 教練</span>
                </div>
                <div className='p-4'>
                  <div className='border-4 rounded-full border-emerald-500 '>
                    { images[1] != null ?
                    <img src={`data:image/png;base64,${images[1]['image_path']}`} alt=""
                      className="w-30 h-30 rounded-full" />
                    :
                      <img src="../../public/user.png" alt=""
                        className="w-24 h-24 rounded-full" />
                    }
                  </div>
                </div>
                <div className='flex items-center justify-between w-4/12 '>
                  <Link to={'/course'}>
                    <FaFacebookSquare size={25} color='#1e293b'/>
                  </Link>
                  <Link to={'/course'}>
                    <FaLine size={25} color='#1e293b' />
                  </Link>
                  <Link to={'/course'}>
                    <FaInstagramSquare size={25} color='#1e293b'/>
                  </Link>
                </div>
                <div className='flex flex-row items-center justify-evenly w-6/12 text-slate-800'>
                  <div className='flex flex-col items-center'>
                    <span className='text-[1.8rem]'>0</span>
                    <span>學員</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-[1.8rem]'>{ class_amount }</span>
                    <span>課程</span>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </section>
      
    </>
  )
}

export default CourseDetail