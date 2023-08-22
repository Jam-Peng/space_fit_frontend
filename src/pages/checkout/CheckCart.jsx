import { PiNumberCircleOneLight, PiNumberCircleTwoLight, PiNumberCircleThreeLight } from "react-icons/pi";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md"
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CheckCartItem from "./CheckCartItem";


function CheckCart() {
  const { cart, clearCart, total } = useContext(CartContext);

  return (
    <section className="container mx-auto">
      <div className="py-20 lg:px-40 xl:px-48 space-y-4 text-slate-800 h-screen mb-10">
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex flex-col items-center text-emerald-500">
            <PiNumberCircleOneLight size={25}/>
            <span>購物車</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="w-6/12 border-t-2 border-emerald-500 "></div>
          </div>
          <div className="flex flex-col items-center">
            <PiNumberCircleTwoLight size={25}/>
            <span>結帳</span>
          </div>
          <div className="w-4/12">
            <div className="w-full border-t-2 border-gray-400/40  "></div>
          </div>
          <div className="flex flex-col items-center">
            <PiNumberCircleThreeLight size={25}/>
            <span>完成</span>
          </div>
        </div>

        <div className="p-4 h-full flex justify-between">
          <div className="border rounded-lg w-8/12 py-4 overflow-hidden bg-emerald-500">
            <div className="flex items-center justify-between pb-2 px-4">
              <div className='uppercase text-base text-slate-50 font-semibold '>Shopping Bag</div>
              <div
                onClick={ clearCart }
                className=' cursor-pointer flex border rounded-md px-2.5 py-0.5 bg-rose-500 text-slate-200  
                hover:bg-slate-50 hover:text-rose-500 hover:border-rose-500 transition'>
                <FiTrash2 size={ 20 }/>
              </div>
            </div>
            
            <div className="overflow-y-auto h-full bg-gray-50 pt-2">
              {cart.length === 0 ?
                <span className="px-5 text-indigo-500">尚未選購課程</span>
              :
              cart.map(item => {
                return <CheckCartItem key={item.id} item={item}/>
              })
              } 
            </div>
          </div>

          <div className="w-3/12">
            <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
              <div className="border-b-2">
                <span className="text-[1.2rem]">訂單明細</span>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <span>總金額</span>
                <span className="text-[1.3rem]">$ {total}</span>
              </div>
              <div className="pt-8 ">
                {cart.length != 0 ?
                  <a href="/checkout" rel="noopener noreferrer">
                  <button className="add-car space-x-1">
                    <MdOutlinePayment size={25}/>
                    <span>會員結帳</span>
                  </button>
                  </a>
                :
                  <button className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-base leading-6 text-slate-50 shadow-sm">
                    <a href="/course" rel="noopener noreferrer" className="flex justify-center space-x-1 ">
                      <MdOutlinePayment size={25} />
                      <span>請先選購課程</span>
                    </a>
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckCart