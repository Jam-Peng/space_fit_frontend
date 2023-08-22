import { Link } from 'react-router-dom'

function Banner() {
  return (
      <section className='bg-gray-200 h-screen bg-np-repeat bg-cover bg-center'>
        <div className='container mx-auto flex justify-around items-center h-full'>
          <div className="flex flex-col justify-center">
            <div className='font-semibold flex items-center uppercase'>
              <div className='w-10 h-[2px] bg-rose-500 mr-3 ml-2'></div> New Trend
            </div>
            <div className='text-[70px] leading-[1.1] font-light mb-4 flex flex-col space-y-2'>
              <span>MAKE LIFE AWESOME</span>
              <span className='font-semibold text-[2.5rem]'>CHALLENGE</span>
            </div>
            <div className='text-end'>
              <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary ml-2'>
                <span>Discover More</span>
              </Link>
            </div>
          </div>
          <div className='hidden lg:block'>
            <img className='h-[600px] w-auto' src="https://images.unsplash.com/photo-1592588253414-887759037c2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="" />
          </div>
        </div>    
      </section>
  )
}

export default Banner