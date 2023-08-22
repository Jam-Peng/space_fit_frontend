import { useContext, useState } from "react";
import { PiUserCircle, PiLockKeyLight } from "react-icons/pi"
import { MdOutlineEmail } from "react-icons/md"
import { IoIosPhonePortrait } from "react-icons/io"
import AuthClientService from "../../servers/Auth.clientService";
import { SiginContext } from "../../contexts/SiginContext";

function RegisterModel() {
  const [registerMessage, setRegisterMessage] = useState("");
  const { isRegisterModel, setIsRegisterModel, registerName, setRegisterName,
    registerPassword, setRegisterPassword,email, setEmail,phone, setPhone, } = useContext(SiginContext)

  const sendRegister = (e) => {
    e.preventDefault()

    if (isRegisterModel) {
      if (registerPassword.length != 8) {
        setRegisterMessage('"密碼" 請輸入8位英數字')
        setTimeout(() => {
          setRegisterMessage("")
        }, 2500)
      } else {
        AuthClientService.register(registerName, registerPassword, email, phone)
        .then((res) => {
          if (res.status === 200) {
            setRegisterMessage(res.data.message)
            setTimeout(() => {
              openLogin()
            }, 1500)
          }
        })
        .catch((err) => {
          setRegisterMessage(err.response.data.message);
          setTimeout(() => {
            setRegisterMessage("")
          }, 2500)
        })
        .finally(() => {
          setTimeout(() => {
            setRegisterMessage("")
          }, 1400)
        })
      }
    }
  }
  
  const openLogin = () => {
    setIsRegisterModel(false)
    setRegisterName("")
    setRegisterPassword("")
    setEmail("")
    setPhone("")
  }
  
  
  return (
    <section className={`${isRegisterModel ? "scale-100" : "scale-0"} fixed  w-full transition-all duration-500`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <h2 className="mt-50 text-center text-[2rem] leading-9 tracking-tight text-slate-50">
          註冊會員
        </h2>
        {registerMessage && (
        <div className="mt-5 flex w-11/12 justify-center rounded-md bg-rose-600 px-3 py-1.5  text-white">
          <p className="text-[1.2rem]">{registerMessage}</p> 
        </div>
        )}
      </div>
    
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="" onSubmit={sendRegister}>
          <div className="flex items-center  space-x-2">
            <label htmlFor="registerName" className="block text-base font-medium leading-6 text-slate-900">
              <PiUserCircle size={40} color="#f8fafc"/>
            </label>
            <div className="w-10/12">
              <input id="registerName" name="registerName" type="text" autoComplete="username" required
                placeholder="Account / 會員帳號"
                value={registerName}
                onChange={e => setRegisterName(e.target.value)}
                className="placeholder_set"/>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="registerPassword" className="block text-base font-medium leading-6 text-slate-900">
              <PiLockKeyLight size={40} color="#f8fafc"/>
            </label>
            <div className="w-10/12">
              <input id="registerPassword" name="registerPassword" type="password" autoComplete="current-password"
                placeholder="Password / 會員密碼"
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                className="placeholder_set"/>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="email" className="block text-base font-medium leading-6 text-slate-900">
              <MdOutlineEmail size={40} color="#f8fafc"/>
            </label>
            <div className="w-10/12">
              <input id="email" name="email" type="email" autoComplete="email" required
                placeholder="Email / 電子信箱"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="placeholder_set"/>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="phone" className="block text-base font-medium leading-6 text-slate-900">
              <IoIosPhonePortrait size={40} color="#f8fafc"/>
            </label>
            <div className="w-10/12">
              <input id="phone" name="phone" type="number" autoComplete="phone" title="電話號碼必須是數字"
                placeholder="Phone / 聯絡電話"  
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="placeholder_set"/>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-center">
              <button type="submit"
                className="flex w-11/12 justify-center border-2 border-emerald-500 rounded-md bg-emerald-500 py-2 text-[1.2rem] 
                leading-6 text-gray-50 shadow-sm hover:border-emerald-600 hover:bg-opacity-0 hover:text-slate-100 mt-2
                cursor-pointer">
                註冊會員
              </button>
            </div>
            <div className="flex justify-center">
              <input type="button"
              className="flex w-11/12 justify-center border-2 border-indigo-500 rounded-md bg-indigo-500 py-2 text-[1.2rem] 
              leading-6 text-gray-50 shadow-sm hover:border-indigo-600 hover:bg-opacity-0 hover:text-slate-100 mt-2
              cursor-pointer"
              value="會員登入"
              onClick={openLogin}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default RegisterModel