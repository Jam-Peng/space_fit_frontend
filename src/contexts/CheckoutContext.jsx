/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CheckoutContext = createContext();

function CheckoutProvider({ children }) {
  const [order, setOrder] = useState([])
  const [orderMessage, setOrderMessage] = useState("")

  return (
    <CheckoutContext.Provider
      value={{ order, setOrder, orderMessage, setOrderMessage }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export default CheckoutProvider