/* eslint-disable react/prop-types */
import { useState } from "react";
import { SiginContext } from "../../contexts/SiginContext";
import { useContext } from "react";
import { PiUserCircle, PiLockKeyLight } from "react-icons/pi"
import { IoMdClose } from "react-icons/io";
import AuthClientService from "../../servers/Auth.clientService";
import RegisterModel from "./RegisterModel";

function SiginModel({setCurrentUser}) {
  const [loginMessage, setLoginMessage] = useState("");
  const { isloginModel, closeLogin, isRegisterModel, setIsRegisterModel,
          username, setUsername, password, setPassword} = useContext(SiginContext)
  
  const sendLogin = (e) => {
    e.preventDefault()

    if (isloginModel) {
      AuthClientService.login(username, password)
      .then((res) => {
        if (res.status === 200) {
          setLoginMessage(res.data.message);
          localStorage.setItem("client", JSON.stringify(res.data));
          setCurrentUser(AuthClientService.getCurrentUser());
          setTimeout(() => {
            closeLogin()
          }, 1500)
        }
      })
      .catch((err) => {
        setLoginMessage(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoginMessage("")
        }, 1400)
      })
    }
  }

  const openRegister = () => {
    setIsRegisterModel(!isRegisterModel)
    setUsername("")
    setPassword("")
  }
  
  return (
    <section className={`${ !isloginModel ? "opacity-0 scale-0 bg-slate-0" : "opacity-1 scale-75 bg-slate-900/90"} 
              flex min-h-[100vh] flex-col justify-center py-60 z-50 fixed top-0 w-6/12 transition-all
              duration-500 rounded-3xl`}>
      <div className="absolute top-10 right-10">
        <button className="rounded-md p-1 bg-rose-500 text-slate-200  
                  hover:bg-slate-50 hover:text-rose-500 hover:border-rose-500"
          onClick={() => { closeLogin() }}>
          <IoMdClose size={25}/>
        </button>
      </div>

      <div className={`${!isRegisterModel ? "scale-100" : "scale-0"} transition-all duration-500`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <h2 className="mt-50 text-center text-[2rem] leading-9 tracking-tight text-slate-50">
            會員登入
          </h2>
          {loginMessage && (
          <div className="mt-5 flex w-11/12 justify-center rounded-md bg-rose-600 px-3 py-1.5 text-white">
            <p className="text-[1.2rem]">{loginMessage}</p> 
          </div>
          )}
        </div>
    
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="" onSubmit={sendLogin}>
            <div className="flex items-center  space-x-2">
              <label htmlFor="username" className="block text-base font-medium leading-6 text-slate-900">
                <PiUserCircle size={40} color="#f8fafc"/>
              </label>
              <div className="w-10/12">
                <input id="username" name="username" type="text" autoComplete="username" required
                  placeholder="Account / 會員帳號"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="placeholder_set"/>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="password" className="block text-base font-medium leading-6 text-slate-900">
                <PiLockKeyLight size={40} color="#f8fafc"/>
              </label>
              <div className="w-10/12">
                <input id="password" name="password" type="password" autoComplete="current-password" required
                  placeholder="Password / 會員密碼" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="placeholder_set"/>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-center">
                <button type="submit"
                  className="flex w-11/12 justify-center border-2 border-emerald-500 rounded-md bg-emerald-500 py-2 text-[1.2rem] 
                  leading-6 text-gray-50 shadow-sm hover:border-emerald-600 hover:bg-opacity-0 hover:text-slate-100 mt-2
                  cursor-pointer">
                  登入會員
                </button>
              </div>
              <div className="flex justify-center">
                <input type="button"
                className="flex w-11/12 justify-center border-2 border-indigo-500 rounded-md bg-indigo-500 py-2 text-[1.2rem] 
                leading-6 text-gray-50 shadow-sm hover:border-indigo-600 hover:bg-opacity-0 hover:text-slate-100 mt-2
                cursor-pointer"
                value="加入會員"
                onClick={openRegister}
                />
              </div>
            </div>
          </form>
          <div className="text-[1.2rem] px-4 pt-3">
            <a href="#" rel="noopener noreferrer" className="font-semibold text-slate-200 hover:text-slate-50">Forgot password ?</a>
          </div>
        </div>
      </div>
      <RegisterModel/>

  </section>
  )
}

export default SiginModel