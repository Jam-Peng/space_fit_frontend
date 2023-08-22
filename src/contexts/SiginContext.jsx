/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SiginContext = createContext()

function SiginProvider({ children }) {
  // 登入model狀態
  const [isloginModel, setIsLoginModel] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // 註冊model狀態
  const [isRegisterModel, setIsRegisterModel] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // 更新會員資料
  const [accountMessage, setAccountMessage] = useState("");
  const [formAccount, setFormAccount] = useState({
    oldPassword: '',
    newPassword: '',
    clientImg: [],
  });
  // 控制購物車按鈕
  const[isDisabled, setIsDisabled]=useState(true)

  // 關閉login model時初始化
  const closeLogin = () => {
    setIsLoginModel(false)
    setIsRegisterModel(false)
    setRegisterName("")
    setRegisterPassword("")
    setEmail("")
    setPhone("")
    setUsername("")
    setPassword("")
  }

  return (
    <SiginContext.Provider
      value={{
        isloginModel, setIsLoginModel, isRegisterModel, setIsRegisterModel, closeLogin,
        registerName, setRegisterName, registerPassword, setRegisterPassword, email, setEmail, phone, setPhone,
        username, setUsername, password, setPassword, formAccount, setFormAccount, accountMessage, setAccountMessage,
        isDisabled, setIsDisabled}}>
      {children}    
    </SiginContext.Provider>
  )
}

export default SiginProvider