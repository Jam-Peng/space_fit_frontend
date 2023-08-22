/* eslint-disable react/prop-types */
import {createContext, useState, useEffect, useContext} from 'react'
import { CheckoutContext } from './CheckoutContext';

export const CartContext = createContext();

function CartProvider({ children }) {
  
  const { setOrder } = useContext(CheckoutContext)

  // 購物車狀態
  const [cart, setCart] = useState([]);
  
  // Header購物車購買數量狀態
  const [itemAmount, setItemAmount] = useState(0);

  // 購買總金額狀態
  const [total, setTotal] = useState(0);

  useEffect(() => { 
    const total = cart.reduce((acc, cur) => {
      return acc + cur.price * cur.amount;
    }, 0);
    setTotal(total)
  },[cart]);

  // 直接更動增加購物車icon的產品數量狀態
  useEffect(() => { 
    if (cart) {
      const amount = cart.reduce((acc, cur) => {
        return acc + cur.amount
      }, 0);
      setItemAmount(amount)
    }
  }, [cart]);
  
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orderCourse"));
    if (orders !== null) {
      setCart(orders)
    } 
  },[])

  // 新增商品到購物車
  const addToCart = (course, id) => {
    const newItem = { ...course, amount: 1 };

    // 比對查詢購物車中的商品 
    const cartItem = cart.find((item) => {
      return item.course_id === id;
    });
    
    // 判斷購物車內的商品是否存在
    if (!cartItem) {
      setCart([...cart, newItem]);
    } 

    // 從 cart 中取出需要的屬性，並儲存到 orderCourses 陣列中
    let orderCourses = cart.map((item) => ({
      title: item.title,
      category: item.category,
      teacher: item.teacher,
      price: item.price,
      amount: item.amount,
      course_id: item.course_id,
      images:item.images
    }));


    localStorage.setItem("orderCourse", JSON.stringify(orderCourses));
    let orderCarts = localStorage.getItem("orderCourse");
    if (orderCarts) {
      let courseArray = JSON.parse(orderCarts);
      courseArray.push(newItem);
      localStorage.setItem("orderCourse", JSON.stringify(courseArray));
    }
    
  };
  
  // 刪除購物車商品
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart)

    let orderCourse =  JSON.parse(localStorage.getItem("orderCourse"));
    orderCourse.forEach((item,index) => {
      if (item.id === id) {
        orderCourse.splice(index, 1)
        localStorage.setItem("orderCourse", JSON.stringify(orderCourse));
        setOrder(orderCourse)
      }
    });
  };

  // 清除購物車內所有商品
  const clearCart = () => { 
    setCart([]);
    localStorage.setItem("orderCourse", JSON.stringify([]));
    setOrder([])
  };

  
  return (
    <CartContext.Provider
      value={{ addToCart, cart, removeFromCart, clearCart, itemAmount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;