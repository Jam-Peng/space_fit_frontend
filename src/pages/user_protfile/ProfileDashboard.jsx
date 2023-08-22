/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserHeader from "../../components/profile/UserHeader";
import { Outlet } from "react-router-dom";


function ProfileDashboard({currentUser, isTokenValid}) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isTokenValid) {
      navigate("/")
      return
    } 
  },[currentUser, navigate, isTokenValid])


  return (
    <section className="container mx-auto">
      <div className="py-20 lg:px-40 xl:px-60">
        <div className="space-y-6">
          <UserHeader />
          <Outlet/>
        </div>
      </div>
    </section>
  )
}

export default ProfileDashboard