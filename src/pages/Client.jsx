/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"
import SideCart from "./SideCart";
import SiginModel from "../components/sigin/SiginModel";
import jwtDecode from 'jwt-decode';
import AuthClientService from "../servers/Auth.clientService";
import { CartContext } from "../contexts/CartContext";

function Client({ currentUser, setCurrentUser, setTokenValid }) {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext)

  useEffect(() => {
    if (!currentUser) {
      setTokenValid(false);
      return;
    }

    // 比對目前的時間和token的到期日是否已經過期
    const checkTokenExpiration = () => { 
      const token = currentUser.token
      const decodedToken = jwtDecode(token);

      // 將 token 到期日轉換成 UNIX 時間戳
      const tokenExpiration = new Date(decodedToken.expires);
      const tokenExpirationTimestamp = Math.floor(tokenExpiration.getTime() / 1000);

      // 目前的時間戳
      const nowTimestamp = Math.floor(new Date().getTime() / 1000);
      // 當大於token時間就自動登出
      // if (nowTimestamp >= tokenExpirationTimestamp) {
        // setTokenValid(false)
        // AuthClientService.logout();
      //   setCurrentUser('');
      //   clearCart()  // 刪除購物車和localStorage購物清單
      //   return
      // } 

      // 重新取的新token - 將目前時間和到期日的時間戳相減，轉成毫秒
      const timeStamp = tokenExpirationTimestamp - nowTimestamp
      const timeToExpire = (new Date(timeStamp).getTime()) * 1000;
      // console.log(timeToExpire)
      const refreshInterval = 60000;   // 設定 1 分鐘(單位為毫秒)，檢查快過期時發送 API 取的新的token

      if (timeToExpire < refreshInterval) {
        AuthClientService.refreshToken(currentUser)
          .then((res) => {
            if (res.status === 200) {
              const newToken = res.data;
              localStorage.setItem("client", JSON.stringify(newToken));
              setCurrentUser(AuthClientService.getCurrentUser());
              setTokenValid(true);
            }else {
              setTokenValid(false);
            }
          })
          .catch((error) => { 
            console.log(error.response)
            setTokenValid(false);
          })
      }
    }
    // 初次渲染時檢查 Token 過期
    // checkTokenExpiration();

    // 設置計時器，50秒檢查一次Token時效
    const intervalId = setInterval(checkTokenExpiration, 50000);

    // 在組件解除掛載時清除計時器
    return () => clearInterval(intervalId);
  },[currentUser, navigate, setCurrentUser, setTokenValid, clearCart])


  return (
    <div>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <div className="flex flex-col items-center">
        <SiginModel setCurrentUser={setCurrentUser}/>
      </div>
      <SideCart />
      <div className="min-h-screen">
        <Outlet/>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}

export default Client