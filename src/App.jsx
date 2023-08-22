import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthClientService from "./servers/Auth.clientService";
import Client from "./pages/Client";
import Home from "./pages/Home"
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound"
import ProfileDashboard from "./pages/user_protfile/ProfileDashboard";
import Account from "./pages/user_protfile/Account";
import OrderCourse from "./pages/user_protfile/OrderCourse";
import CheckCart from "./pages/checkout/CheckCart";
import CheckOut from "./pages/checkout/CheckOut";
import CheckDone from "./pages/checkout/CheckDone";

function App() {
  // 使用者狀態
  const [currentUser, setCurrentUser] = useState(AuthClientService.getCurrentUser());
  const [isTokenValid, setTokenValid] = useState(false);
  
  return (
    <div className="mx-auto ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Client currentUser={currentUser} setCurrentUser={setCurrentUser} setTokenValid={setTokenValid} />}>
              <Route index element={<Home />} />
              <Route path="/course" element={<Courses currentUser={currentUser} />}/>
              <Route path="/course/:id" element={<CourseDetail currentUser={currentUser} />} />
              <Route path="/cart" element={<CheckCart />} />
              <Route path="/checkout" element={<CheckOut currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
              <Route path="/checkdone" element={<CheckDone currentUser={currentUser} />} />
              <Route path="/user" element={<ProfileDashboard currentUser={currentUser} isTokenValid={isTokenValid} />}>
                <Route index element={<Account currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/> 
                <Route path="/user/ordercourse" element={<OrderCourse currentUser={currentUser} />}/>  
              </Route>  
            </Route>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
