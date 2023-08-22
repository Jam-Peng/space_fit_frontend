/* eslint-disable react/prop-types */
import { PiNumberCircleThreeLight } from "react-icons/pi";
import { FiCheckCircle } from 'react-icons/fi';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckDone({ currentUser }) {
  const navigate = useNavigate();
  const [purchasedCourses, setPurchasedCourses ] = useState([])
  const [orderId , setOrderId ] = useState("")

  useEffect(() => {
    if (!currentUser.client_data.purchased_courses ) {
      navigate('/course')
    } else if (!currentUser.order) {
      navigate('/course')
    } else {
      setPurchasedCourses(currentUser.client_data.purchased_courses)
      setOrderId(currentUser.order.order_id)
    }
  }, [currentUser.client_data.purchased_courses, navigate, currentUser.order])
  

  return (
    <section className="container mx-auto">
      <div className="py-20 lg:px-40 xl:px-48 space-y-4 text-slate-800 h-screen mb-10">
        
        <div className="p-4 flex items-center justify-between text-emerald-500">
          <div className="flex flex-col items-center">
            <FiCheckCircle  size={20}/>
            <span>購物車</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="border-t-2 border-emerald-500"></div>
          </div>
          <div className="flex flex-col items-center">
            <FiCheckCircle size={20}/>
            <span>結帳</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="border-t-2 border-emerald-500"></div>
          </div>
          <div className="flex flex-col items-center">
            <PiNumberCircleThreeLight size={25}/>
            <span>完成</span>
          </div>
        </div>

        <div className="p-4 h-full ">
          <div className="border rounded-lg space-y-8 ">
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <div className="bg-emerald-500 text-slate-50 flex items-center space-x-2 px-4 py-3 ">
                <FiCheckCircle size={22} /> 
                <span className="">已完成課程購買</span>
              </div>
              <div className="p-4">
                <div className="space-x-4 px-0.5">
                  <span>訂單編號</span>
                  <span className="text-indigo-500">{ orderId }</span>
                </div>
              </div>
              
              <div className="space-y-2 p-4">
                <div className="flex items-center border-b px-1 pb-1 font-medium space-x-3">
                  <div className="w-2/12">
                    <span>類別</span>
                  </div>
                  <div className="w-5/12">
                    <span>課程</span>
                  </div>
                  <div className="w-2/12">
                    <span>教練</span>
                  </div>
                  <div className="w-2/12 px-3.5">
                    <span>售價</span>
                  </div>
                </div>
                          
                {purchasedCourses.map((item) => {
                  return (
                    <div className="flex items-center px-1 text-base pb-1 space-x-3" key={item.id}>
                      <div className="w-2/12">
                        <span>{ item.course_category }</span>
                      </div>
                      <div className="w-5/12">
                        <span>{ item.course_title }</span>
                      </div>
                      <div className="w-2/12">
                        <span>{ item.course_teacher }</span>
                      </div>
                      <div className="w-2/12">
                        <span>$ { item.course_price }</span>
                      </div>
                    </div>
                  )
                })}  
              </div> 
                
            </div>
          </div>
        </div> 
      </div>
    </section>
  )
}

export default CheckDone