/* eslint-disable react/prop-types */
import {createContext, useState} from 'react'

export const SidecarContext = createContext();

function SidercarProvider({ children }) {
  // sidebar state
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false)
  };

  return (
    <SidecarContext.Provider value={{ isOpen, setIsOpen, handleClose}}>
      {children}
    </SidecarContext.Provider>
  )
}

export default SidercarProvider;