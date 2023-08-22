/* eslint-disable react/prop-types */
import { SlCalender } from "react-icons/sl";
import { BsTags } from "react-icons/bs";

function OrderList({item, format_time}) {

  return (
    <section className="border rounded-lg bg-white">
      <div className="space-y-5 p-2 ">
        <div className="px-1 flex items-center justify-between">
          <div className="space-x-2 text-emerald-500 flex items-center">
            <BsTags size={20}/>
            <span>訂單編號</span>
            <span>{item.order_id}</span>
          </div>
          <div className="space-x-2 flex items-center text-[0.85rem]">
            <span><SlCalender size={20} /></span>
            <span> {format_time(item.create_date)} </span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center border-b px-1 pb-1 mb-1 font-medium space-x-3">
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

          {item.current_course.map((obj) => (
            <div className="flex items-center px-1 pb-1 space-x-3 text-slate-800/70" key={obj.id}>
              <div className="w-2/12">
                  <span>{ obj.course_category }</span>
              </div>
              <div className="w-5/12">
                <span>{ obj.course_title }</span>
              </div>
              <div className="w-2/12">
                <span>{ obj.course_teacher }</span>
              </div>
              <div className="w-2/12">
                <span>$ { obj.course_price }</span>
              </div>
            </div>  
          ))}
        </div>
      </div>
    </section>
  )
}

export default OrderList