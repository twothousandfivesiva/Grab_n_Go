import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import React, { useEffect } from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import { useSelector } from "react-redux";
import Search from "./component/Product/Search.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingIcons from "./component/layout/FloatingIcons/FloatingIcons.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

  }, []);

  return (
    <Router>
      
      <Header />
       {isAuthenticated && (
    // <div style={{
    //   position: "fixed",
    //   top: "1rem",
    //  right: "1.5rem",
      
    //   zIndex: 1000,
    // }}>
      <UserOptions user={user} />
    // </div>
  )}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
         <Route exact path="/products" element={<Products/>} />
            <Route exact path="/search" element={<Search/>} />
           <Route  path="/products/:keyword" element={<Products/>} />
            <Route exact path="/login" element={<LoginSignUp/>} />
             <Route path="/account" element={
                    <ProtectedRoute>
                    <Profile />
                     </ProtectedRoute>
                      }
              />
               <Route path="/me/update" element={
                    <ProtectedRoute>
                  <UpdateProfile />
                     </ProtectedRoute>
                      }
              />
                <Route path="/password/update" element={
                    <ProtectedRoute>
                  <UpdatePassword/>
                     </ProtectedRoute>
                      }
              />
                <Route exact path="/password/forgot" element={<ForgotPassword/>} />
                 <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      </Routes>
      <FloatingIcons />
      <Footer />
   
    </Router>
  );
}

export default App;
