/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
import OrderService from "../servers/Order.service";
  
export const AccountContext = createContext();

function AccountProvider({ children }) {
  const [orderList, setOrderList] = useState([])
  const [orderMessage, setOrderMessage] = useState("")
  
  // 取得使用者所有課程訂單
  const client_orders = (token, client_id) => {
    OrderService.getAllOrders(token, client_id)
      .then((res) => {
        if (res.status === 200) {
          setOrderList(res.data.orders)
        }
      })
      .catch((err) => {
        setOrderMessage(err.response.data.message)
      })
      .finally(() => {
        setTimeout(() => {
          setOrderMessage("")
        }, 2000)
      })
  }

  // 轉換日期
  const format_time = (time) => {
    const dateTime = new Date(time);
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayOfWeek = daysOfWeek[dateTime.getDay()];
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const startHour = hour >= 12 ? hour - 12 : hour;
    const period = hour < 12 ? 'AM' : 'PM';
  
    const formatDateTime = `${dateTime.getFullYear()}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')}/${dateTime.getDate().toString().padStart(2, '0')} ${startHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period} ${dayOfWeek}`;
    return formatDateTime;
  }


  return (
    <AccountContext.Provider
      value={{ client_orders, orderList, orderMessage, setOrderMessage, format_time }}>
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider