

function UserHeader() {
  return (
    <section className="text-slate-800 border-b space-y-2 py-1">
      <div>
        <span className="text-[1.1rem]">會員中心</span>
      </div>

      <div className="text-base flex items-center space-x-10">
        <div>
          <a href="/user" rel="noopener noreferrer" className="hover:text-emerald-500">
            <span>個人資料</span>
          </a>
        </div>
        <div>
          <a href="/user/ordercourse" rel="noopener noreferrer" className="hover:text-emerald-500">
            <span>課程查詢</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default UserHeader