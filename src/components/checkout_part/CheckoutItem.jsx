import { useContext, useEffect} from "react"
import CartService from "../../servers/Cart.service"
import { CheckoutContext } from "../../contexts/CheckoutContext"

function CheckoutItem() {
  const { order, setOrder }=useContext(CheckoutContext)
  
  useEffect(() => {
    const localOrders = CartService.getOrderCourse()
    setOrder(localOrders)
  }, [setOrder])


  return (
    <section className="p-4">
      <div>
        <div className="space-y-2">
          <div className="flex items-center border-b px-1 pb-1 font-medium space-x-3">
            <div className="w-2/12">
              <span>類別</span>
            </div>
            <div className="w-5/12">
              <span>課程</span>
            </div>
            <div className="w-2/12">
              <span>教練</span>
            </div>
            <div className="w-2/12 px-3.5">
              <span>售價</span>
            </div>
          </div>
          {order.map((item, index) => {
            return (
              <div className="flex items-center px-1 text-base pb-1 space-x-3" key={index}>
                <div className="w-2/12">
                  <span>{ item.category }</span>
                </div>
                <div className="w-5/12">
                  <span>{ item.title }</span>
                </div>
                <div className="w-2/12">
                  <span>{ item.teacher }</span>
                </div>
                <div className="w-2/12">
                  <span>$ { item.price }</span>
                </div>
              </div>
            )
          })}
        </div> 
      </div>
    </section>
  )
}

export default CheckoutItem