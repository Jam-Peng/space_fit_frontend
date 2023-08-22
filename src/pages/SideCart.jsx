import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2 } from "react-icons/fi";
import { IoMdArrowForward } from "react-icons/io";
import { MdOutlinePayment } from 'react-icons/md/'
import CartItem from '../components/course/CartItem';
import { SidecarContext } from '../contexts/SidecarContext';
import { CartContext } from '../contexts/CartContext';

function SideCart() {
  const { isOpen, handleClose} = useContext(SidecarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <div className={`${isOpen ? 'right-0':'-right-full'} w-full bg-stone-50 fixed top-0 h-full shadow-2xl 
      md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px=[35px]`}>
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-base font-semibold'>Shopping Bag ({itemAmount})</div>
        <div
          onClick={ handleClose }
          className="cursor-pointer w-8 h-8 flex justify-center items-center">
          <IoMdArrowForward size={ 25 }/>
        </div>
      </div>

      {/* Cart Item */}
      <div className='flex flex-col gap-y-2 h-[520px] lg:h-[630px] border-b overflow-y-auto'>
        {cart.map((item,index) => {
          return <CartItem key={index} item={item}/>
        })}
      </div>

      {/* cart bottom */}
      <div className='flex flex-col justify-center py-4 space-y-4'>
        <div className='flex justify-between items-center w-full px-1'>
          <div className='uppercase'>
            <span className='mr-2'>總金額</span>$ {total.toFixed(0)}
          </div>
          <div
            onClick={ clearCart }
            className='cursor-pointer btn btn-delete btn-delete:hover py-1'>
            <FiTrash2 size={ 18 }/>
          </div>
        </div>
        <button className='add-car'>
          <Link to={'/cart'} className=' flex space-x-2'>
            <MdOutlinePayment size={25}/>
            <span>結帳</span>
          </Link>
        </button>
        
      </div>
    </div>
  )
}

export default SideCart;