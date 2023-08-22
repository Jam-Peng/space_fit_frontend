/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { CartContext } from '../../contexts/CartContext';
import { useContext } from 'react';

function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext)
  const { id, title, images, price, category, course_id } = item;


  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full text-gray-500'>
      <div className='w-full min-h-[80px] flex items-center gap-x-4'>
        <div className=''>
          <Link to={`/course/${course_id}`}>
            <img src={`data:image/png;base64,${images[0]['image_path']}`} alt=""
              className='max-w-[90px] border rounded-lg' />
          </Link>
        </div>
        
        <div className='w-full flex justify-between'>
          <div className='flex flex-col justify-between w-8/12'>
            <div>
              <Link
                to={`/course/${course_id}`}
                className='text-[1.1rem] font-medium max-w-[240px] text-primary hover:underline'>
                {title}
              </Link>
            </div>
            <div className='text-[0.9rem]'>
              { category}
            </div>
          </div>
          <div className=' flex flex-col items-end justify-between space-y-2'>
            <div className='cursor-pointer'
              onClick={() => removeFromCart(id)}>
              <IoMdClose size={25}
                className='flex border rounded-md p-0.5 bg-rose-500 text-slate-100  
                  hover:bg-slate-50 hover:text-rose-500 hover:border-rose-500 transition' />
            </div>
            <div className=''>$ { price }</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem;