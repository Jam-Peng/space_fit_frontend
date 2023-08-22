/* eslint-disable react/prop-types */
// import { AiOutlineMenu } from "react-icons/ai"
import { BsBag } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import { MdDashboard, MdOutlinePayment } from "react-icons/md"
import { useContext, useEffect, useState } from "react"
import { SidecarContext } from "../contexts/SidecarContext"
import { CartContext } from "../contexts/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { SiginContext } from "../contexts/SiginContext"
import AuthClientService from "../servers/Auth.clientService"
import OpenProfileModel from "./profile/OpenProfileModel"


function Header({currentUser, setCurrentUser}) {
  // hearder background state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidecarContext);
  const { itemAmount, clearCart } = useContext(CartContext);
  const { isloginModel, setIsLoginModel, setIsDisabled } = useContext(SiginContext)
  const[isProfile, setIsProfile] = useState(false)
  const navigate = useNavigate();
  
  // header background scroll event 
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    })
  });

  const logout = () => {
    AuthClientService.logout();
    setCurrentUser("");
    clearCart()
    navigate("/")
    setIsDisabled(true)
	};

  const profileToggle = () => {
    setIsProfile(!isProfile)
  }


  return (
    <>
      <header className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"} fixed w-full z-10 transition-all`} >
        <div className="px-10 flex items-center justify-between h-full ">
          <div className=" flex items-center space-x-4 ">
            <div>
              <Link to={'/'} rel="noopener noreferrer">
                <p className="text-[1.4rem] font-medium text-emerald-500">SPACE-FIT</p>
              </Link>
            </div>
            <div className="text-slate-800">
              <Link to={'/course'} rel="noopener noreferrer" className="flex space-x-1" >
              <MdDashboard size={22}/>
              <p className="text-lg">探索課程</p>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-slate-800">
            {!currentUser ?
              <div className={"header_btn px-2.5 py-0.3"}
                onClick={()=>{ setIsLoginModel(!isloginModel) }}>
                <FaUser size={18}/>
                <span className="text-[0.95rem]"> 登入</span>
              </div>
              :
              <div className="header_btn px-2.5 py-0.4 relative">
                <div className="flex items-center space-x-1" onClick={profileToggle} >
                  <FaUser size={18}/>
                  <span className="text-[0.95rem]">{currentUser.client_data.name}</span>
                </div>
              </div>
            }

            < OpenProfileModel isProfile={isProfile} profileToggle={profileToggle} />

            {currentUser && 
              <div className="header_btn px-2 py-0.3"
                onClick={logout}>
                <BiLogOut size={25}/>
                <span className="text-[0.95rem]">登出</span>
              </div> 
            }
            <div className="header_btn px-2 py-0.3">
              <Link to={'/cart'} rel="noopener noreferrer"
                className="flex items-center space-x-1" >
                <MdOutlinePayment size={25} />
                <span className="text-[0.95rem]">結帳</span>
              </Link>
            </div>

            <div
              onClick={() => { setIsOpen(!isOpen) }}
              className="cursor-pointer flex relative">
              <BsBag size={25} />
              <div
                className="bg-rose-500 absolute -right-2 -bottom-2 text-sm w-[18px] h-[18px] 
                  text-stone-50 rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;