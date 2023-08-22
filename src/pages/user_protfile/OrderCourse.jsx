/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react"
import { AccountContext } from "../../contexts/AccountContext"
import OrderList from "./OrderList";

function OrderCourse({ currentUser }) {
  const { client_orders, orderList, orderMessage, format_time } = useContext(AccountContext)
  const token = currentUser.token
  const client_id = currentUser.client_data.id

  useEffect(() => {
    client_orders(token, client_id)
  },[])
  
  return (
    <section className="space-y-6 text-slate-800 h-full">
      <div className="py-4">
        <div className="border-2 rounded-lg overflow-auto">
          <div className="bg-emerald-500 text-slate-50 px-4 py-3 space-x-2">  
            <span className="">所有課程</span>
            <span className="text-indigo-500">{ orderMessage }</span>
          </div>
          
          <div className="p-4 bg-gray-50 text-base space-y-4">
            {currentUser.client_data.courses.length === 0 ?
            <div className="text-indigo-500 px-1">
              尚未購買課程
            </div>
            :
            orderList.map((item) => {
              return (
                <div key={item.id}>
                  <OrderList item={item}  format_time={format_time} />
                </div>
              )
            })
            }
          </div> 
        </div>
      </div>
    </section>
  )
}

export default OrderCourse
