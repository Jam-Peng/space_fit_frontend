import './styles/css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CourseProvider from './contexts/CourseContext'
import SidercarProvider from './contexts/SidecarContext'
import CartProvider from './contexts/CartContext'
import SiginProvider from './contexts/SiginContext'
import CheckoutProvider from './contexts/CheckoutContext'
import AccountProvider from './contexts/AccountContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SiginProvider>
    <AccountProvider>
      <CheckoutProvider>
        <SidercarProvider>
          <CartProvider>
            <CourseProvider>
              <React.StrictMode>
                <App/>
              </React.StrictMode>
            </CourseProvider>
          </CartProvider>
        </SidercarProvider>
      </CheckoutProvider>
    </AccountProvider>
  </SiginProvider>
  )
