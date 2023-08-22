/* eslint-disable react/prop-types */

function OpenProfileModel({isProfile, profileToggle}) {
  
  return (
    <section className={`${!isProfile ? 'scale-0 ' : 'scale-100 '} top-14 z-80 bg-slate-50 absolute border rounded-lg 
    w-[100px] shadow-lg transition-all duration-500 text-base text-emerald-500 p-2 border-slate-200 space-y-1`}
    onMouseLeave ={profileToggle}>
      <div className="rounded-md hover:bg-emerald-500 hover:text-gray-100 py-0.6 px-2">
        <a href="/user" rel="noopener noreferrer">
          <span>會員中心</span>
        </a>
      </div>
      <div className="rounded-md hover:bg-emerald-500 hover:text-gray-100 py-0.6 px-2">
        <a href="/user/ordercourse" rel="noopener noreferrer">
          <span>課程查詢</span>
        </a>
      </div>
    </section>
  )
}

export default OpenProfileModel