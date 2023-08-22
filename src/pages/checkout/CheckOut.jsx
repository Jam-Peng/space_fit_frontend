/* eslint-disable react/prop-types */
import { PiNumberCircleTwoLight, PiNumberCircleThreeLight } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md"
import { FiCheckCircle } from 'react-icons/fi';
import { useContext, useState } from "react";
import CheckoutItem from "../../components/checkout_part/CheckoutItem";
import { CartContext } from "../../contexts/CartContext";
import { CheckoutContext } from "../../contexts/CheckoutContext";
import CartService from "../../servers/Cart.service";
import AuthClientService from "../../servers/Auth.clientService";
import { useNavigate } from "react-router-dom";

function CheckOut({ currentUser, setCurrentUser }) {
  const { total, clearCart } = useContext(CartContext);
  const { order, orderMessage, setOrderMessage } = useContext(CheckoutContext)
  const [option, setOption] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOption(e.target.value)
  }

  const sendOrder = (e) => {
    e.preventDefault() 

    if (option === '') {
      setOrderMessage("請確認資料填寫完成")
      
    } else if (order.length === 0) {
      setOrderMessage("請先購買課程")
      
    } else {
      const newDatas = {
        order: order.map(item => ({
        title: item.title,
        category: item.category,
        teacher: item.teacher,
        price: item.price,
        amount: item.amount,
        course_id: item.course_id,
        })),
        payment_option: option,
      }

      // 確認結帳
      CartService.generateOrder(currentUser.token, newDatas, currentUser.client_data.public_id)
        .then((res) => {
          if (res.status === 200) { 
            // setOrderMessage(res.data.message)
            AuthClientService.logout();
            localStorage.setItem("client", JSON.stringify(res.data));
            setCurrentUser(AuthClientService.getCurrentUser());
            clearCart()
            
            navigate('/checkdone')
          }
        })
        .catch((err) => {
          setOrderMessage(err.response.data.message)
        })
        .finally(() => {
          setTimeout(() => {
            setOrderMessage("")
          }, 2500)
        })
    } 
  }
  setTimeout(() => {
    setOrderMessage("")
  }, 2500)
  
  
  return (
    <section className="container mx-auto">
      <div className="py-20 lg:px-40 xl:px-48 space-y-4 text-slate-800 h-screen mb-10">
        <div className="p-4 flex items-center justify-between ">
          <div className="flex flex-col items-center text-emerald-500">
            <FiCheckCircle  size={20}/>
            <span>購物車</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="border-t-2 border-emerald-500"></div>
          </div>
          <div className="flex flex-col items-center text-emerald-500">
            <PiNumberCircleTwoLight size={25}/>
            <span>結帳</span>
          </div>
          <div className="w-4/12 bg-gray-400/40">
            <div className="w-6/12 border-t-2 border-emerald-500"></div>
          </div>
          <div className="flex flex-col items-center">
            <PiNumberCircleThreeLight size={25}/>
            <span>完成</span>
          </div>
        </div>

        <div className="p-4 h-full flex justify-between">
          <div className="w-8/12 space-y-8 ">
            <div className="border rounded-lg h-[410px] overflow-hidden">
              <div className="bg-emerald-500 px-4 py-3 ">
                <span className="text-slate-50">購買課程</span>
              </div>
              <div className="overflow-y-auto h-full bg-gray-50">
                <CheckoutItem/>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-emerald-500 px-4 py-3">
                <span className="text-slate-50 ">付款方式</span>
              </div>
              <div className="px-4 py-6 bg-gray-50">
                <select name="checkout" id="checkout"
                  className="border rounded-lg w-full p-1 text-base"
                  defaultValue="-- 請選擇付款方式 --" onChange={ handleChange }>
                  <option value="-- 請選擇付款方式 --" disabled>-- 請選擇付款方式 --</option>
                  <option value="信用卡">信用卡</option>
                  <option value="ATM轉帳">ATM轉帳</option>
                </select>
              </div>
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
              
              <div className="pt-8">
                <div className="mb-2">
                  <span className="text-indigo-500">{ orderMessage }</span>
                </div>
                <a href="" rel="noopener noreferrer">
                  <button className="add-car space-x-1" onClick={ sendOrder }>
                    <MdOutlinePayment size={25}/>
                    <span>確認結帳</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckOut